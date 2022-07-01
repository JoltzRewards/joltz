import { IListFilesOptions, IListFileParam, StorageOperationResult } from '../types'

/* Return total number of files */
export async function countFiles(
  { storage }: IListFileParam,
  _options?: IListFilesOptions,
): Promise<StorageOperationResult<number>> {
  return await storage
    .listFiles((_name: string) => {
      return true /* to loop, callback returns true each file found */
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

/* Return filenames */
export async function listFiles(
  { storage }: IListFileParam,
  _options?: IListFilesOptions,
): Promise<StorageOperationResult<string[]>> {
  let fileList: string[] = []
  await storage
    .listFiles((name: string) => {
      fileList.push(name)
      return true /* to loop, callback returns true each file found */
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
  return { ok: true, results: fileList, error: null } /* fileList[] stores filenames */
}
