type GetResults = {}
type UploadResults = {}

export interface Bridge {
  adapter: any
}

export interface Adapter {}

export interface TBDAdapter extends Adapter {}
export interface GaiaAdapter extends Adapter {}
export interface HyperProtocolAdapter extends Adapter {}
