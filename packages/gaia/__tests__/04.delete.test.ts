import { AppConfig, UserSession } from '@stacks/auth'
import { Storage } from '@stacks/storage'
import { deleteFile } from '../src/modules/delete'
import { sampleAccount } from './sample_accts' // user credentials for test simulation.

async function fn1() {
  const path = 'file.json'
  const options = { wasSigned: false }
  const appConfig = new AppConfig(['store_write', 'publish_data'], 'http://trubit.tests:3000')
  const userSession = new UserSession({ appConfig })
  userSession.store.getSessionData().userData = <any>{
    appPrivateKey: sampleAccount.keyInfo.privateKey,
  }
  const storage = new Storage({ userSession })
  const results = await deleteFile({ storage, fileName: path }, options)
  console.log(results)
}

fn1()
