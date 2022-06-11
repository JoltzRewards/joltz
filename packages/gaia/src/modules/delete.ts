import { DeleteFileParams, IDeleteFileOptions, StorageOperationResult } from '../types'

export async function deleteFile(
  { storage, fileName }: DeleteFileParams,
  options?: IDeleteFileOptions,
): Promise<StorageOperationResult<void>> {
  return await storage
    .deleteFile(fileName, options)
    .then(() => ({ ok: true, results: null, error: null }))
    .catch((err) => ({
      ok: false,
      results: null,
      error: JSON.parse(JSON.stringify(err)),
    }))
}
