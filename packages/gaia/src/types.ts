import type { Storage } from '@stacks/storage'
import { ESMap } from 'typescript'

type ResultType = number | string | ESMap<number, string> | ArrayBuffer | void

//-----------------------------------------------------------------------------
//  Result of a Gaia call
//-----------------------------------------------------------------------------
export type StorageOperationResult<Result extends ResultType> = {
  ok: boolean
  results: Result | null
  error: Record<string, unknown> | null
}

//-----------------------------------------------------------------------------
//  putFile() parameters
//-----------------------------------------------------------------------------
export type PutFileParams = {
  storage: Storage
  fileName: string
  data: any
}

//-----------------------------------------------------------------------------
//   getFile() parameters
//-----------------------------------------------------------------------------
export type GetFileParams = {
  storage: Storage
  fileName: string
}

//-----------------------------------------------------------------------------
//   deleteFile() parameters
//-----------------------------------------------------------------------------
export type DeleteFileParams = {
  storage: Storage
  fileName: string
}

export interface IDeleteFileOptions {
  wasSigned?: boolean
}

export type { Storage } from '@stacks/storage'

export type {
  PutFileOptions as IPutFileOptions,
  GetFileOptions as IGetFileOptions,
} from '@stacks/storage'
