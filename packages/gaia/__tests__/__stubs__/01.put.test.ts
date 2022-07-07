import { AppConfig, UserSession } from '@stacks/auth'
import { Storage } from '@stacks/storage'
import { putFile } from '../../src'
import { sampleAccount } from '../../__fixtures__' // user credentials for test simulation.

const path = 'file.json'
const data = JSON.stringify({ interest: 'skiing', age: 22, gender: 'male' })

async function fn1() {
  const appConfig = new AppConfig(['store_write'], 'http://trubit.tests:3000')
  const userSession = new UserSession({ appConfig })
  userSession.store.getSessionData().userData = <any>{
    appPrivateKey: sampleAccount.keyInfo.privateKey,
  }
  const storage = new Storage({ userSession })
  const results = await putFile({ storage, fileName: path, data: data })
  console.log(results)
}

fn1()
