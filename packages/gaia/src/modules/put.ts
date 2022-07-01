import { putDefaults } from '../constants'
import { IPutFileOptions, IPutFileParam, StorageOperationResult } from '../types'

export async function putFile(
  { storage, fileName, data }: IPutFileParam,
  options?: IPutFileOptions,
): Promise<StorageOperationResult<string>> {
  const mergedOptions = {
    ...putDefaults,
    ...(options || {}),
  }

  return await storage
    .putFile(fileName, data, mergedOptions)
    .then((url) => ({ ok: true, results: url, error: null }))
    .catch((err) => {
      if (err instanceof Error) {
        console.log(err.name)
        return { ok: false, results: null, error: err.message }
      }
      return { ok: false, results: null, error: err }
    })
}
