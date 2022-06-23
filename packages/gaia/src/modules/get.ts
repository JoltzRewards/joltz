import { getDefaults } from '../constants'
import { IGetFileParam, IGetFileOptions, StorageOperationResult } from '../types'

export async function getFile(
  { storage, fileName }: IGetFileParam,
  options?: IGetFileOptions,
): Promise<StorageOperationResult<string | ArrayBuffer>> {
  // dartman: <string | ArrayBuffer>. got it. :)
  const mergedOptions = {
    ...getDefaults,
    ...(options || {}), //dartman: need to google this part.
  }

  return await storage
    .getFile(fileName, mergedOptions)
    .then(() => ({ ok: true, results: null, error: null }))
    .catch((err) => ({
      ok: false,
      results: null,
      error: JSON.parse(JSON.stringify(err)),
    }))
}
