/*
Constant default values of options combinations.
To suggest pre-configured options parameters.
To help developers with ideal practical values - presumably commonly used.
*/

import { IPutFileOptions, IGetFileOptions, IListFilesOptions, IDeleteFileOptions } from './types'

/* PutFileOptions default constant values */
export const putDefaults: IPutFileOptions = {
  cipherTextEncoding: 'base64', //  'base64' or 'hex' - what's the issue with using hex?
  dangerouslyIgnoreEtag: true,
  encrypt: true,
  sign: true,
  wasString: false, // use Buffer, for both binary and string. Buffer may even be performant in this use case.
}

/*
export const putPDFDefaults: PutFileOptions = {
  ...putDefaults, // dartman - shallow copy and overrides wasString value? interesting.
  wasString: false, // during get, Buffer contents will be returned as opposed to String
}
*/

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
