import { putDefaults } from '../constants'
import { IPutFileOptions, PutFileParams, StorageOperationResult } from '../types'

export async function putFile(
  { storage, fileName, data }: PutFileParams,
  options?: IPutFileOptions,
): Promise<StorageOperationResult> {
  const mergedOptions = {
    ...putDefaults,
    ...(options || {}),
  }

  return await storage
    .putFile(fileName, data, mergedOptions)
    .then((url) => ({ ok: true, results: url, error: null }))
    .catch((err) => ({
      ok: false,
      results: null,
      error: JSON.parse(JSON.stringify(err)),
    }))
}
