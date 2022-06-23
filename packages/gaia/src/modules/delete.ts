import { deleteDefaults } from '../constants'
import { IDeleteFileParam, IDeleteFileOptions, StorageOperationResult } from '../types'

export async function deleteFile(
  { storage, fileName }: IDeleteFileParam,
  options?: IDeleteFileOptions,
): Promise<StorageOperationResult<void>> {
  const mergedOptions = {
    ...deleteDefaults,
    ...(options || {}),
  }
  return await storage
    .deleteFile(fileName, mergedOptions)
    .then(() => ({ ok: true, results: null, error: null }))
    .catch((err) => ({
      ok: false,
      results: null,
      error: JSON.parse(JSON.stringify(err)),
    }))
}
