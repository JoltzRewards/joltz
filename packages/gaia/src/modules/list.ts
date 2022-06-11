import { Storage, StorageOperationResult } from '../types'

export async function listFiles({
  storage,
  path,
}: {
  storage: Storage
  path: string
}): Promise<StorageOperationResult<number>> {
  return await storage
    .listFiles((name) => name !== undefined)
    .then((ok) => ({
      ok: true,
      results: ok,
      error: null,
    }))
    .catch((err) => ({
      ok: false,
      results: null,
      error: JSON.parse(JSON.stringify(err)),
    }))
}
