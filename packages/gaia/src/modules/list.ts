import { IListFilesOptions, IListFileParam, StorageOperationResult } from '../types'

/* return total number of files */
export async function countFiles(
  { storage }: IListFileParam,
  _options?: IListFilesOptions,
): Promise<StorageOperationResult<number>> {
  return await storage
    .listFiles((_name: string) => {
      console.log('asdf')
      return true /* to loop, this callback must return true per file */
    })
    .then((res: number) => ({
      ok: true,
      results: res /* file count */,
      error: null,
    }))
    .catch((err: any) => ({
      ok: false,
      results: null,
      error: JSON.parse(JSON.stringify(err)),
    }))
}

/* return filenames */
export async function listFiles(
  { storage }: IListFileParam,
  _options?: IListFilesOptions,
): Promise<StorageOperationResult<string[]>> {
  let fileList: string[] = []
  await storage
    .listFiles((name: string) => {
      fileList.push(name)
      return true /* to loop, this callback must return true per file */
    })
    .then((res: number) => ({
      ok: true,
      results: res /* not used inside this function. */,
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
