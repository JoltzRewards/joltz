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
    .then(() => ({ ok: true, results: fileName, error: null })) /* returns deleted filename */
    .catch((err) => ({
      ok: false,
      results: null,
      error: JSON.parse(JSON.stringify(err)),
    }))
}
