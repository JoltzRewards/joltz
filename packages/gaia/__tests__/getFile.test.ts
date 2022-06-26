jest.mock('../src/modules', () => ({
  getFile: jest.fn(() => Promise.resolve({ ok: true, results: null, error: null })),
}))

import fetchMock from 'jest-fetch-mock'
import { AppConfig, UserSession } from '@stacks/auth'
import { Storage } from '@stacks/storage'
import { getFile } from '../src'

beforeEach(() => {
  fetchMock.resetMocks()
  jest.resetModules()
})

describe('getFile', () => {
  const path = 'file.json'
  const options = { decrypt: true, verify: true }

  test('returns expected payload on success', async () => {
    const appConfig = new AppConfig(['store_write'], 'http://trubit.tests:3000')
    const userSession = new UserSession({ appConfig })

    const storage = new Storage({ userSession })

    const success = jest.fn((x) => x)
    const results = await getFile({ storage, fileName: path }, options).then(success)

    expect(success).toHaveBeenCalled()
    expect(results.ok).toBe(true)
    expect(results.results).toBeDefined()
    expect(success).toHaveBeenCalledTimes(1)
  })

  test('fails when storage param is missing', async () => {
    const results = await getFile({ storage: null, fileName: path }, options)

    expect(results).toThrowError
  })

  test('fails when fileName param is missing', async () => {
    const appConfig = new AppConfig(['store_write'], 'http://trubit.tests:3000')
    const userSession = new UserSession({ appConfig })

    const storage = new Storage({ userSession })
    const failure = jest.fn((x) => x)
    const results = await getFile({ storage, fileName: null }, options).catch(failure)
    console.log(results) /* 'null' filename returns 'true' results.ok */
    expect(results).toThrowError
  })

  test('returns "ok: false" when file does not exist', async () => {
    const appConfig = new AppConfig(['store_write'], 'http://trubit.tests:3000')
    const userSession = new UserSession({ appConfig })

    const storage = new Storage({ userSession })
    const failure = jest.fn((x) => x)
    const results = await getFile({ storage, fileName: 'IDoNotExist' }, options).catch(failure)
    console.log(results)
    expect(results.ok).toBe(false) /* how can i do this Not Found testing in mock? */
  })
})
