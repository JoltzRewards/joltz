// type GetResults = {}
// type UploadResults = {}

export enum StorageProviders {
  GAIA = 'gaia',
  HYPERCORE = 'hypercore',
  TBD = 'tbd',
}

export interface Bridge {
  adapter: Adapter
}

export interface Adapter {
  identifier: string
}

// export interface TBDAdapter extends Adapter {}
// export interface GaiaAdapter extends Adapter {}
// export interface HyperProtocolAdapter extends Adapter {}
