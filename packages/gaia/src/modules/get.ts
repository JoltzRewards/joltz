import { getDefaults } from '../constants'
import { IGetFileParam, IGetFileOptions, StorageOperationResult } from '../types'

export async function getFile(
  { storage, fileName }: IGetFileParam,
  options?: IGetFileOptions,
): Promise<StorageOperationResult<string | ArrayBuffer>> {
  const mergedOptions = {
    ...getDefaults,
    ...(options || {}),
  }

  return await storage
    .getFile(fileName, mergedOptions)
    .then((fileContent) => ({ ok: true, results: fileContent, error: null }))
    .catch((err) => {
      if (err instanceof Error) {
        return { ok: false, results: null, error: err.message }
      }
      return { ok: false, results: null, error: err }
    })
}
