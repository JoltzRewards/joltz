/*
To run : node api-caller-03.js
Prerequisites:
npm install @stacks/transactions
npm install node-fetch
Works only with uint map key. Need to code for other types - like principal.
*/

import {
  cvToString,
  cvToJSON,
  hexToCV,
  deserializeCV,
  uintCV,
  cvToHex,
} from '@stacks/transactions' // "npm install @stacks/transactions"

import fetch from 'node-fetch' // "npm install node-fetch"

let keyStart = 0 // set as desired
let keyEnd = 1000 // set as desired

for (let i = keyStart; i < keyEnd; i++) {
  let data = cvToHex(uintCV(i)) // uintCV converts integer to Clarity uint, then cvToHex converts Clarity uint to hexadecimal.

  // megapont-robot-nft maps
  let urlMegapontRobot =
    'https://stacks-node-api.mainnet.stacks.co/v2/map_entry/SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335/megapont-robot-nft/'

  // (define-map robot-sequence uint {mouth: uint, jewellery: uint, head: uint, eyes: uint, ears: uint, body: uint, background: uint})
  let mapRobotSequence = 'robot-sequence'

  // (define-map robot-names uint (string-ascii 80))
  let mapRobotNames = 'robot-names'

  //Choose map:
  let url = urlMegapontRobot + mapRobotSequence
  //let url = urlMegapontRobot + mapRobotNames;

  let response = ''

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => {
    response = res
  })

  let responseResolved = await response
  let zzz = await responseResolved.json()

  console.log(i, '=', cvToString(deserializeCV(zzz.data)))
}
