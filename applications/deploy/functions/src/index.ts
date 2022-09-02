'use strict';

import {
  TransactionVersion,
  makeContractDeploy,
  makeContractCall,
  broadcastTransaction,
  TxBroadcastResult,
} from '@stacks/transactions';
import { Account, generateWallet, getStxAddress } from '@stacks/wallet-sdk';
import { StacksMainnet, StacksTestnet, StacksMocknet } from '@stacks/network';

import { https } from 'firebase-functions';
import $fetch from 'node-fetch';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

import { AnchorMode, uintCV } from '@stacks/transactions';
import { principalCV } from '@stacks/transactions/dist/clarity/types/principalCV';

const phrase =
  process.env.SEED_PHRASE ||
  'frame shop chef water bulk glory diagram hair summer stadium jungle snack envelope unveil poet napkin awesome scare copper expose rigid gold bottom husband';
const network = process.env.NETWORK || 'mocknet';
const debug = process.env.MODE == 'debug' || false;

var core = 'https://mock.valera.co';
var provider = new StacksMocknet({ url: core });

if (network == 'mainnet' || network == 'testnet') {
  core = `https://stacks-node-api.${network}.stacks.co`;

  if (network == 'mainnet') {
    provider = new StacksMainnet();
  } else {
    provider = new StacksTestnet()
  }
}

const domain = debug
  ? 'http://localhost:5001/trubit-341013/us-central1'
  : 'https://us-central1-trubit-341013.cloudfunctions.net';

admin.initializeApp({
  credential: admin.credential.cert('../account.json'),
});

const firestore = getFirestore()

//////////////////////////////     ENDPOINTS      \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// TODO (Azz): convert to onCall like mint
export const deploy = https.onRequest(async (req, res) => {
  if (!cors(req, res)) {
    return
  }

  if (req.method !== 'POST') {
    res.status(403).send('method not allowed');
    return;
  }

  if (!debug) {
    res.status(403).send('must be authenticated');
    return;
  }

  const missingBodyParams = checkMissingKeys(req.body, [
    'description',
    'image',
    'slug',
    'name',
  ]);

  if (missingBodyParams.length > 0) {
    res
      .status(403)
      .send('missing required fields:' + missingBodyParams.join(', '));

    return;
  }

  if (!/^[a-zA-Z0-9\-]+$/.test(req.body.slug)) {
    res.status(403).send('slug does not match character set');
    return;
  }

  if (req.body.name.includes('\n')) {
    res.status(403).send('name cannot contain newline');
    return;
  }

  // this prevents multiple contracts with the same slug from colliding, maybe make this the brand ID?
  const nonce = Math.floor(Math.random() * (9999999 - 1000000) + 1000000)

  const metadata = {
    collection: req.body.name,
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    external_url: 'https://trubit.tech/external/' + nonce,
    contract_type: 'default',
  };

  try {
    await firestore.doc(`/metadata/${nonce}`).set(metadata)
  } catch (err) {
    res.status(500).send('failed to update metadata');
    return;
  }

  const tokenURI = `${domain}/metadata?id=${nonce}`

  console.log('token-uri payload', metadata);

  const name = req.body.slug + '-' + nonce;
  const body = fillContract(req.body.name, req.body.slug, tokenURI);
  const account = await getAccount();
  const address = getAddress(account);

  try {
    const campaigns = await firestore
      .collection('campaigns')
      .where('slug', '==', req.body.slug)
      .get();

    if (campaigns.empty) {
      throw new https.HttpsError('not-found', 'The campaign does not exist.');
    }

    const campaign = campaigns.docs[0].ref;
    const campaignData = (await campaign.get()).data();

    if (!campaignData) {
      throw new https.HttpsError('not-found', 'The campaign does not exist.');
    }

    if (campaignData.assetType.disable === true) {
      throw new https.HttpsError('not-found', 'The campaign does not exist.');
    }

    await campaign.update({
      contractId: `${address}.${name}`,
    });
  } catch (err) {
    res.status(500).send('failed to update campaign');
    return;
  }

  const response = await deployContract(
    name,
    body,
    await getAccountNonce(address),
    account,
  )

  res.status(200).send({
    txid: response.txid,
    nonce: nonce,
    contract: `${address}.${name}`,
  });
});

export const address = https.onRequest(async (req, res) => {
  if (!cors(req, res)) {
    return
  }

  const account = await getAccount()
  const address = getAddress(account)

  res.status(200).send(address)
})

export const metadata = https.onRequest(async (req, res) => {
  if (!cors(req, res)) {
    return
  }

  const missingKeys = checkMissingKeys(req.query, ['id']);

  if (missingKeys.length > 0) {
    res.status(400).send('missing query keys: ' + [...missingKeys]);
  }

  var metadata;

  try {
    metadata = (await firestore.doc(req.query.id as string).get()).data();
  } catch (err) {
    res.status(500).send(err);
    return;
  }

  res.status(200).json(metadata);
});

export const mint = https.onCall(async (data, context) => {
  const { txid, receiveAddress } = data;

  if (!(typeof txid === 'string') || txid.length === 0) {
    throw new https.HttpsError(
      'invalid-argument',
      'The function must be called with one arguments "txid" containing the message text to add.'
    );
  }

  if (!context.auth) {
    throw new https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.'
    );
  }

  const { email } = context.auth.token;

  const txRef = await firestore.doc(`/transactions/${txid}`).get();

  const tx = txRef.data();

  if (!tx || tx.email !== email) {
    throw new https.HttpsError('not-found', 'The transaction does not exist.');
  }

  if (tx.minted) {
    throw new https.HttpsError(
      'already-exists',
      'The transaction has already been minted.'
    );
  }

  const campaigns = await firestore
    .collection('campaigns')
    .where('slug', '==', tx.campaign)
    .get();

  if (campaigns.docs.length < 1) {
    throw new https.HttpsError('not-found', 'The campaign does not exist.');
  }

  const campaignData = (await campaigns.docs[0].ref.get()).data();

  if (!campaignData) {
    throw new https.HttpsError('not-found', 'The campaign does not exist.');
  }

  if (campaignData.assetType.disable === true) {
    throw new https.HttpsError('not-found', 'The campaign does not exist.');
  }

  if (!campaignData.contractId) {
    throw new https.HttpsError(
      'not-found',
      'The campaign does not have a contract.'
    );
  }

  const tokenID = (campaignData.tokenID || 0) + 1
  const account = await getAccount();
  const mintRes = await mintToken(
    await getAccountNonce(getAddress(account)),
    campaignData.contractId,
    account,
    receiveAddress,
    tokenID
  );

  await txRef.ref.update({
    lastTokenID: tokenID
  });

  return {
    txid: mintRes.txid,
  };
});

//////////////////////////////       HELPERS      \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function checkMissingKeys(object: any, required: string[]): string[] {
  const missingKeys: string[] = [];

  for (const key of required) {
    if (!object[key]) {
      missingKeys.push(key)
    }
  }

  return missingKeys
}

function fillContract(name: string, slug: string, tokenURI: string): string {
  // TODO(Linden): remove whitelisted account
  return `;;
;; ${name} (c) TRUBIT.TECH 2022
;;

(define-non-fungible-token ${slug} uint)

(define-constant CONTRACT-CREATOR tx-sender)

(define-constant ERR-NOT-AUTHORIZED (err u0))

(define-data-var token-uri (string-ascii 256) "${tokenURI}")

(define-data-var last-id uint u0)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) ERR-NOT-AUTHORIZED)
    (nft-transfer? ${slug} token-id sender recipient)
  )
)

(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? ${slug} token-id))
)

(define-read-only (get-last-token-id)
  (ok (var-get last-id))
)

(define-read-only (get-token-uri (token-id uint))
  (ok (some (var-get token-uri)))
)

(define-public (mint (token-id uint) (recipient principal))
  (begin
    (asserts! (or (is-eq tx-sender CONTRACT-CREATOR) (is-eq tx-sender 'ST3AX0XG7Y00HPKESYHRTH58QHN06EMNW6NHJMNE2)) ERR-NOT-AUTHORIZED)
    (try! (nft-mint? ${slug} token-id recipient))
    (var-set last-id token-id)
    (ok true)
  )
)

(define-public (set-token-uri (new-token-uri (string-ascii 256)))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-CREATOR) (err ERR-NOT-AUTHORIZED))
    (var-set token-uri new-token-uri)
    (ok true)
  )
)`
}

function getAddress(account: Account): string {
  const version =
    network === 'mainnet'
      ? TransactionVersion.Mainnet
      : TransactionVersion.Testnet;

  return getStxAddress({
    account: account,
    transactionVersion: version,
  })
}

// https://cloud.google.com/functions/docs/samples/functions-http-cors
async function cors(req: https.Request, res: any) {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');

    res.status(204).send('');

    return false;
  }

  return true;
}

//////////////////////////////      HIRO API      \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

async function deployContract(
  name: string,
  body: string,
  nonce: number,
  account: Account
): Promise<TxBroadcastResult> {
  const tx = await makeContractDeploy({
    contractName: name,
    codeBody: body,
    // TODO(Linden): mocknet always fails to estimate fees
    fee: network != 'mainnet' && network != 'testnet' ? 10000 : undefined,
    nonce: nonce,
    senderKey: account.stxPrivateKey,
    network: provider,
    anchorMode: AnchorMode.OnChainOnly,
  });

  const response = await broadcastTransaction(tx);

  if (response.error) {
    // TODO(Linden): typescript flags this condition as impossible (TS2367)
    // @ts-ignore
    if (response.reason === 'ConflictingNonceInMempool') {
      return await deployContract(name, body, nonce + 1, account);
    }

    if (response.reason === 'BadNonce' && response.reason_data?.expected) {
      return await deployContract(
        name,
        body,
        response.reason_data.expected,
        account
      );
    }

    throw new Error(`failed to deploy because ${JSON.stringify(response)}`);
  }

  return response;
}

async function mintToken(
  nonce: number,
  contractID: string,
  senderAccount: Account,
  receiveAddress: string,
  tokenID: number
): Promise<TxBroadcastResult> {
  const [contractAddress, contractName] = contractID.split('.');
  const transaction = await makeContractCall({
    contractAddress,
    contractName,
    functionName: 'mint',
    functionArgs: [uintCV(tokenID), principalCV(receiveAddress)],
    senderKey: senderAccount.stxPrivateKey,
    validateWithAbi: true,
    network: provider,
    fee: network != 'mainnet' && network != 'testnet' ? 10000 : undefined,
    anchorMode: AnchorMode.OnChainOnly,
  });

  const res = await broadcastTransaction(transaction);

  if (res.error) {
    // TODO(Linden): typescript flags this condition as impossible (TS2367)
    // @ts-ignore
    if (res.reason === 'ConflictingNonceInMempool') {
      return await mintToken(
        nonce + 1,
        contractID,
        senderAccount,
        receiveAddress,
        tokenID
      );
    }

    if (res.reason === 'BadNonce' && res.reason_data?.expected) {
      return await mintToken(
        res.reason_data.expected,
        contractID,
        senderAccount,
        receiveAddress,
        tokenID
      );
    }

    throw new Error(`failed to mint because ${JSON.stringify(res)}`);
  }

  return res;
}

//////////////////////////////       WALLET       \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

async function getAccount(): Promise<Account> {
  const wallet = await generateWallet({
    secretKey: phrase,
    password: '',
  });

  return wallet.accounts[0]
}

async function getAccountNonce(address: string): Promise<number> {
  let response = await $fetch(`${core}/v2/accounts/${address}`);

  const account = (await response.json()).nonce;

  response = await $fetch(
    `${core}/extended/v1/address/${address}/nonces?unanchored=true`
  );

  const body = await response.json();

  let nonce: number = body.possible_next_nonce;

  if (account > nonce) {
    nonce = account;
  }

  if (body.detected_missing_nonces.length > 0) {
    nonce = Math.min(...body.detected_missing_nonces)
  }

  return nonce
}
