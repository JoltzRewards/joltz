import { deleteDefaults } from '../constants'
import { IDeleteFileParam, IDeleteFileOptions, StorageOperationResult } from '../types'

export async function deleteFile(
  { storage, fileName }: IDeleteFileParam,
  options?: IDeleteFileOptions,
): Promise<StorageOperationResult<string>> {
  const mergedOptions = {
    ...deleteDefaults,
    ...(options || {}),
  }
  return await storage
    .deleteFile(fileName, mergedOptions)
    .then(() => ({ ok: true, results: fileName, error: null })) /* returns deleted file */
    .catch((err) => {
      if (err instanceof Error) {
        return { ok: false, results: null, error: { name: err.name, message: err.message } }
      }
      return { ok: false, results: null, error: err }
    })
}
