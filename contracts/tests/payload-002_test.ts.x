
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.14.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Testing payload-002. Tested with clarinet version 0.21.2",

    async fn(chain: Chain, accounts: Map<string, Account>) {

        /* Assign wallets to be used for simulating the escrow participants - seller, buyer, mediator. */
        let sender    = accounts.get('wallet_9')!;
        let receiver  = accounts.get('wallet_8')!;
        let escrow    = accounts.get('wallet_7')!;
        let amount    = 'u1000';                   /* Set the amount to send.  Adjust as desired. */
        let hello     = '"Hello Better World!"';   /* For the echo function. */

        console.log(' ');
        console.log('+--------------------------------------------------+');
        console.log('| Testing payload-002                              |');
        console.log('+--------------------------------------------------+');

        let block = chain.mineBlock([
           Tx.contractCall('payload-002', 'echo', [hello], sender.address),
           Tx.contractCall('payload-002', 'block-height-please', [], sender.address),
           Tx.contractCall('payload-002', 'check-target-height', [], sender.address),
           Tx.contractCall('payload-002', 'send-stx-when-its-time', [], sender.address),
           Tx.contractCall('payload-002', 'get-balance-sender', [], sender.address),
           Tx.contractCall('payload-002', 'get-balance-receiver', [], sender.address),
        ]);

        /*
        console.log('---- block data ---- ');
        console.log(block);
        console.log('----- sender wallet ---- ');
        console.log(sender);
        console.log('----- receiver wallet ---- ');
        console.log(receiver);
        */

        console.log(' ');
        console.log('---- next block ---- ');
        console.log('result count           = ' + block.receipts.length);
        console.log('echo                   = ' + block.receipts[0].result);
        console.log('block-height           = ' + block.receipts[1].result);
        console.log('check-target-height    = ' + block.receipts[2].result);
        console.log('send-stx-when-its-time = ' + block.receipts[3].result);
        console.log('get-balance-sender     = ' + block.receipts[4].result);
        console.log('get-balance-receiver   = ' + block.receipts[5].result);

        /* assertEquals(block.receipts.length, 4); */
        assertEquals(block.receipts[0].result.expectOk(), hello);
        assertEquals(block.receipts[1].result.expectOk(), 'u1');
        assertEquals(block.receipts[2].result, 'false');

        block = chain.mineBlock([   /* advance to next block */
           Tx.contractCall('payload-002', 'echo', [hello], sender.address),
           Tx.contractCall('payload-002', 'block-height-please', [], sender.address),
           Tx.contractCall('payload-002', 'check-target-height', [], sender.address),
           Tx.contractCall('payload-002', 'send-stx-when-its-time', [], sender.address),
           Tx.contractCall('payload-002', 'get-balance-sender', [], sender.address),
           Tx.contractCall('payload-002', 'get-balance-receiver', [], sender.address),
        ]);

      /*
      console.log('---- block data ---- ');
      console.log(block);
      console.log('----- sender wallet ---- ');
      console.log(sender);
      console.log('----- receiver wallet ---- ');
      console.log(receiver);
      console.log(' ');
      */

      console.log(' ');
      console.log('---- next block ---- ');
      console.log('result count           = ' + block.receipts.length);
      console.log('echo                   = ' + block.receipts[0].result);
      console.log('block-height           = ' + block.receipts[1].result);
      console.log('check-target-height    = ' + block.receipts[2].result);
      console.log('send-stx-when-its-time = ' + block.receipts[3].result);
      console.log('get-balance-sender     = ' + block.receipts[4].result);
      console.log('get-balance-receiver   = ' + block.receipts[5].result);

      /* assertEquals(block.receipts.length, 5); */
      assertEquals(block.receipts[0].result.expectOk(), hello);
      assertEquals(block.receipts[1].result.expectOk(), 'u2');
      assertEquals(block.receipts[2].result, 'true');

         /*
         -----------------------------------------------------------------------------------------------------------------   
            END OF THE LINE.  PLEASE WATCH THE GAP.
         -----------------------------------------------------------------------------------------------------------------
         */

         console.log(' ');
         console.log('+--------------------------------------------------+');
         console.log('| Bye now.  See you on the next test.              |');
         console.log('+--------------------------------------------------+');
         console.log(' ');
         console.log(' ');
    },
});
