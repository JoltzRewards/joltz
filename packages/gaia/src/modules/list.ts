import { IListFilesOptions, StorageOperationResult } from '../types'

/* return total number of files */
export async function countFiles({
  storage,
}: {
  storage: Storage
}): Promise<StorageOperationResult<number>> {
  return await storage
    .listFiles((_name: string) => {
      return true // return true to loop
    })
    .then((res: number) => ({
      ok: true,
      results: res, //file count
      error: null,
    }))
    .catch((err: any) => ({
      ok: false,
      results: null,
      error: JSON.parse(JSON.stringify(err)),
    }))
}

/* return filenames */
export async function listFiles({
  storage,
}: {
  storage: Storage
  /* dartman: need to understand this line 100% - <StorageOperationResult<string[]>> */
}): Promise<StorageOperationResult<string[]>> {
  let fileList: string[] = []
  await storage
    .listFiles((name: string) => {
      fileList.push(name)
      return true /* to loop, return true */
    })
    .then((res: number) => ({
      ok: true,
      results: res /* irrelevant inside this function. */,
      error: null,
    }))
    .catch((err: any) => ({
      ok: false,
      results: null,
      error: JSON.parse(JSON.stringify(err)),
    }))
  return { ok: true, results: fileList, error: null } /* fileList[] has the filenames */
}

/* dartman: I need to understand this yet.
export async function listFiles({
  storage,
  path,
}: {
  storage: Storage
  path: string
}): Promise<StorageOperationResult<number>> {
  return await storage
    .listFiles((name) => name !== undefined)  //dartman: how does this behave?
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
*/
