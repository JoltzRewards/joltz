import type { Storage } from '@stacks/storage'
import { ESMap } from 'typescript'

type ResultType = number | string | string[] | ESMap<number, string> | ArrayBuffer | void

/*
-----------------------------------------------------------------------------
  Result of a Gaia call
-----------------------------------------------------------------------------
*/
export type StorageOperationResult<Result extends ResultType> = {
  ok: boolean
  results: Result | null
  error: Record<string, unknown> | null
}

/*
----------------------------------------------------------------------------------------------
  Interfaces to represent parameters, one for each Put, Get, Delete and List.
---------------------------------------------------------------------------------------------- 
*/

/* putFile() parameters */
export interface IPutFileParam {
  storage: Storage
  fileName: string
  data: any
}

/* getFile() parameters */
export interface IGetFileParam {
  storage: Storage
  fileName: string
}

/* listFile() parameters */
export interface IListFileParam {
  storage: Storage
}

/* deleteFile() parameters */
export interface IDeleteFileParam {
  storage: Storage
  fileName: string
}

/*
----------------------------------------ß------------------------------------------------------
  Interfaces for all options. One for each Put, Get, Delete and List.
----------------------------------------------------------------------------------------------
*/

/* deleteFile() options */
export interface IDeleteFileOptions {
  wasSigned?: boolean
}

export type { Storage } from '@stacks/storage'

/* listFile() options */
// To do : For listFile() options interface, build something that will be used for following scenarios:
//   1. Accept a prefix and returns a list of filenames satisfying prefix.
//   2. Accept a parameter that signal the function to return list of directories.

export interface IListFilesOptions {
  prefix?: string
  folders?: boolean
}

/* putFile() and getFile() options */
export type {
  PutFileOptions as IPutFileOptions,
  GetFileOptions as IGetFileOptions,
} from '@stacks/storage'
