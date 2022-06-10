import type { Storage } from '@stacks/storage'
import { ESMap } from 'typescript'

//-----------------------------------------------------------------------------
//  Result of a Gaia call
//-----------------------------------------------------------------------------
export type StorageOperationResult =
  | {
      ok: boolean
      results?: string | ESMap<number, string> | ArrayBuffer
      error?: any | null
    }
  | {
      ok: true
      results: string | ESMap<number, string> | ArrayBuffer
      error?: null
    }
  | {
      ok: false
      results?: null
      error: any
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

export type { PutFileOptions as IPutFileOptions } from '@stacks/storage'
