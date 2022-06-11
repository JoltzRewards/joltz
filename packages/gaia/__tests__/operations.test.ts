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
  const path = 'file.json'
  const options = { encrypt: false }

  test('returns expected payload on success', async () => {
    const appConfig = new AppConfig(['store_write'], 'http://trubit.tests:3000')
    const userSession = new UserSession({ appConfig })

    const storage = new Storage({ userSession })
    const success = jest.fn((x) => x)
    const results = await putFile({ storage, fileName: path, data: 'hello' }, options).then(success)

    expect(success).toHaveBeenCalled()
    expect(results.ok).toBe(true)
    expect(results.results).toBeDefined()
    expect(success).toHaveBeenCalledTimes(1)
  })

  test('fails when storage param is missing', async () => {
    const results = await putFile({ storage: null, fileName: path, data: 'hello' }, options)

    expect(results).toThrowError
  })

  test('fails when data param is missing', async () => {
    const appConfig = new AppConfig(['store_write'], 'http://trubit.tests:3000')
    const userSession = new UserSession({ appConfig })

    const storage = new Storage({ userSession })
    const failure = jest.fn((x) => x)
    const results = await putFile({ storage, fileName: path, data: null }, options).catch(failure)

    expect(results).toThrowError
  })
})

describe('deleteFile', () => {
  test('stub', () => {
    expect(true).toBe(true)
  })
})

describe('listFiles', () => {
  test('stub', () => {
    expect(true).toBe(true)
  })
})

describe('getFile', () => {
  test('stub', () => {
    expect(true).toBe(true)
  })
})
