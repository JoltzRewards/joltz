//import fetchMock from 'jest-fetch-mock'
import { AppConfig, UserSession } from '@stacks/auth'
import { Storage } from '@stacks/storage'
import { countFiles, listFiles } from '../src/modules/list'
import { sampleAccount } from './sample_accts' // user credentials for test simulation.

async function fn1() {
  //test('returns expected payload on success', async () => {
  const appConfig = new AppConfig(['store_write', 'publish_data'], 'http://trubit.tests:3000')
  const userSession = new UserSession({ appConfig })
  userSession.store.getSessionData().userData = <any>{
    appPrivateKey: sampleAccount.keyInfo.privateKey,
  }
  const storage = new Storage({ userSession })
  //const success = jest.fn((x) => x)

  console.log(storage.userSession.store)

  const results = await countFiles({ storage }) //.then(success)
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

async function fn2() {
  //test('returns expected payload on success', async () => {
  const appConfig = new AppConfig(['store_write', 'publish_data'], 'http://trubit.tests:3000')
  const userSession = new UserSession({ appConfig })
  userSession.store.getSessionData().userData = <any>{
    appPrivateKey: sampleAccount.keyInfo.privateKey,
  }
  const storage = new Storage({ userSession })
  //const success = jest.fn((x) => x)

  console.log(storage.userSession.store)

  const results = await listFiles({ storage }) //.then(success)
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

fn1()
fn2()
