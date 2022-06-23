import { putDefaults } from '../constants'
import { IPutFileOptions, IPutFileParam, StorageOperationResult } from '../types'

export async function putFile(
  { storage, fileName, data }: IPutFileParam,
  options?: IPutFileOptions,
): Promise<StorageOperationResult<string>> {
  // dartman: take note of '<string>'
  const mergedOptions = {
    // dartman: aaah, so this is how it's done. shallow copy.
    ...putDefaults,
    ...(options || {}), //dartman: need to google this part.
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
