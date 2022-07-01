/*
Constant default values of options combinations.
To suggest pre-configured options parameters.
To help developers with ideal practical values - presumably commonly used.
*/

import { IPutFileOptions, IGetFileOptions, IListFilesOptions, IDeleteFileOptions } from './types'

/* PutFileOptions default constant values */
export const putDefaults: IPutFileOptions = {
  cipherTextEncoding: 'base64',
  dangerouslyIgnoreEtag: true,
  encrypt: true,
  sign: true,
  wasString: false, // use Buffer, for both binary and string.
}

/* GetFileOptions default constant values */
export const getDefaults: IGetFileOptions = {
  decrypt: true, // assumes encrypted
  verify: true, // assumes signed
}

/* ListFileOptions default constant values */
export const listDefaults: IListFilesOptions = {} // no specific values (for now), returns all path and files

/* DeleteFileOptions default constant values */
export const deleteDefaults: IDeleteFileOptions = {
  wasSigned: true, // assumes signed
}
