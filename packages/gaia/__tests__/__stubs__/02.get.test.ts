//import fetchMock from 'jest-fetch-mock'
import { AppConfig, UserSession } from '@stacks/auth'
import { Storage } from '@stacks/storage'
import { getFile } from '../../src'
import { sampleAccount } from '../../__fixtures__' // user credentials for test simulation.

async function f1() {
  //test('returns expected payload on success', async () => {
  const path = 'pdf/malabar.pdf'
  //const options = { encrypt: false }
  const options = { decrypt: false, verify: false }

  //test('returns expected payload on success', async () => {
  //const appConfig = new AppConfig(['store_write'], 'http://trubit.tests:3000')
  const appConfig = new AppConfig(['store_write', 'publish_data'], 'trubit')
  const userSession = new UserSession({ appConfig })

  // 2. Set session private key
  userSession.store.getSessionData().userData = <any>{
    appPrivateKey: sampleAccount.keyInfo.privateKey,
  }

  const storage = new Storage({ userSession })
  //const success = jest.fn((x) => x)

  console.log(storage.userSession.store)
  //console.log(storage.getGaiaAddress)

  const results = await getFile({ storage, fileName: path }, options) //.then(success)
  //const results = await getFile({ storage }) //, fileName: path }) //, options) //.then(success)

  console.log(results)

  /*
  expect(success).toHaveBeenCalled()
  expect(results.ok).toBe(true)
  expect(results.results).toBeDefined()
  expect(success).toHaveBeenCalledTimes(1)
  */
}
//})

f1()
