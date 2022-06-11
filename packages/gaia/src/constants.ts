/*
Constant values of PutFile option combinations.
The idea is that, instead of individual functions, we
can choose PutFileOptions pre-configured constants and
pass as parameters.
*/

import { PutFileOptions } from '@stacks/storage'

export const putDefaults: PutFileOptions = {
  cipherTextEncoding: 'base64', //  'base64' or 'hex' - what's the issue with not using hex?
  dangerouslyIgnoreEtag: true,
  encrypt: true,
  sign: true,
  wasString: true,
}

export const putPDFDefaults: PutFileOptions = {
  ...putDefaults,
  wasString: false, // during get, Buffer contents will be returned as opposed to String
}
