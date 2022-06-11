import { GetFileParams, IGetFileOptions, StorageOperationResult } from '../types'

export async function getFile(
  { storage, fileName }: GetFileParams,
  options?: IGetFileOptions,
): Promise<StorageOperationResult<string | ArrayBuffer>> {
  return await storage
    .getFile(fileName, options)
    .then(() => ({ ok: true, results: null, error: null }))
    .catch((err) => ({
      ok: false,
      results: null,
      error: JSON.parse(JSON.stringify(err)),
    }))
}
