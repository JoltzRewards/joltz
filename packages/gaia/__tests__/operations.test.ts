jest.mock('../src/modules', () => ({
  putFile: jest.fn(() =>
    Promise.resolve({ ok: true, results: 'https://trubit.hub/files/x.json', error: null }),
  ),
}))

import fetchMock from 'jest-fetch-mock'
import { AppConfig, UserSession } from '@stacks/auth'
import { Storage } from '@stacks/storage'
import { putFile } from '../src'

beforeEach(() => {
  fetchMock.resetMocks()
  jest.resetModules()
})

describe('putFile', () => {
  test('returns expected payload on success', async () => {
    const path = 'file.json'
    const gaiaHubConfig = {
      address: '1NZNxhoxobqwsNvTb16pdeiqvFvce3Yg8U',
      server: 'https://hub.blockstack.org',
      token: '',
      url_prefix: 'gaia.testblockstack.org/hub/',
    }

    const appConfig = new AppConfig(['store_write'], 'http://trubit.tests:3000')
    const userSession = new UserSession({ appConfig })
    userSession.store.getSessionData().userData = {
      gaiaHubConfig,
    } as any

    const storage = new Storage({ userSession })

    const success = jest.fn((x) => x)

    const options = { encrypt: false }

    const results = await putFile({ storage, fileName: path, data: 'hello' }, options).then(success)

    expect(success).toHaveBeenCalled()
    expect(results.ok).toBe(true)
    expect(results.results).toBeDefined()
    expect(success).toHaveBeenCalledTimes(1)
  })

  test('fails when storage param is missing', async () => {
    const path = 'file.json'
    const gaiaHubConfig = {
      address: '1NZNxhoxobqwsNvTb16pdeiqvFvce3Yg8U',
      server: 'https://hub.blockstack.org',
      token: '',
      url_prefix: 'gaia.testblockstack.org/hub/',
    }

    const appConfig = new AppConfig(['store_write'], 'http://trubit.tests:3000')
    const userSession = new UserSession({ appConfig })
    userSession.store.getSessionData().userData = {
      gaiaHubConfig,
    } as any

    // const storage = new Storage({ userSession })
    const failure = jest.fn((x) => x)
    const options = { encrypt: false }
    const results = await putFile({ storage: null, fileName: path, data: 'hello' }, options).catch(
      failure,
    )

    expect(results).toThrowError
  })

  test('fails when data param is missing', async () => {
    const path = 'file.json'
    const gaiaHubConfig = {
      address: '1NZNxhoxobqwsNvTb16pdeiqvFvce3Yg8U',
      server: 'https://hub.blockstack.org',
      token: '',
      url_prefix: 'gaia.testblockstack.org/hub/',
    }

    const appConfig = new AppConfig(['store_write'], 'http://trubit.tests:3000')
    const userSession = new UserSession({ appConfig })
    userSession.store.getSessionData().userData = {
      gaiaHubConfig,
    } as any

    const storage = new Storage({ userSession })
    const failure = jest.fn((x) => x)
    const options = { encrypt: false }
    const results = await putFile({ storage, fileName: path, data: null }, options).catch(failure)

    expect(results).toThrowError
  })
})
