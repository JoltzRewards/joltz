jest.mock('../src/modules', () => ({
  listFiles: jest.fn(() => Promise.resolve({ ok: true, results: null, error: null })),
}))

import fetchMock from 'jest-fetch-mock'
//import { AppConfig, UserSession } from '@stacks/auth'
//import { Storage } from '@stacks/storage'
//import { listFiles, countFiles } from '../src/modules/list'
const { AppConfig, UserSession } = jest.requireActual('@stacks/auth')
const { listFiles, countFiles } = jest.requireActual('../src/modules/list')
const { Storage } = jest.requireActual('@stacks/storage')

beforeEach(() => {
  fetchMock.resetMocks()
  jest.resetModules()
})

/*
describe('listFiles', () => {
  test('returns expected payload on success', async () => {
    const appConfig = new AppConfig(['store_write', 'publish_data'], 'http://trubit.tests:3000')
    const userSession = new UserSession({ appConfig })

    const storage = new Storage({ userSession })

    const success = jest.fn((x) => x)
    const results = await listFiles({ storage }).then(success)

    expect(success).toHaveBeenCalled()
    console.log(results)
    expect(results.ok).toBe(true)
    expect(results.results).toBeDefined()
    expect(success).toHaveBeenCalledTimes(1)
  })
})
*/

describe('countFiles', () => {
  test('returns expected payload on success', async () => {
    const appConfig = new AppConfig(['store_write', 'publish_data'], 'http://trubit.tests:3000')
    const userSession = new UserSession({ appConfig })
    console.log(userSession)

    const storage = new Storage({ userSession })
    console.log(storage)
    console.log(storage.store)
    const success = jest.fn((x) => x)
    const results = await countFiles({ storage }).then(success)

    expect(success).toHaveBeenCalled()
    console.log(results)
    expect(results.ok).toBe(true)
    expect(results.results).toBeDefined()
    expect(success).toHaveBeenCalledTimes(1)
  })
})
