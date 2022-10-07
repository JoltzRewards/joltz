// type GetResults = {}
// type UploadResults = {}

export enum StorageProviders {
  GAIA = 'gaia',
  HYPERCORE = 'hypercore',
  TBD = 'tbd',
}

export interface Bridge {
  adapter: Adapter
  isConnected: boolean
  logstream: unknown
  queue: unknown[]

  createDirectory(opts: unknown): Promise<unknown>
  listFiles(opts: unknown): Promise<unknown>
  listDirectories(opts: unknown): Promise<unknown>
  getFile(opts: unknown): Promise<unknown>
  getDirectory(opts: unknown): Promise<unknown>
  putFile(opts: unknown): Promise<unknown>
  deleteDirectory(opts: unknown): Promise<unknown>
  deleteFile(opts: unknown): Promise<unknown>
}

export interface Adapter {
  identifier: string
  eventNames: string[]

  list(opts: unknown): Promise<unknown>
  get(opts: unknown): Promise<unknown>
  delete(opts: unknown): Promise<unknown>
  put(opts: unknown): Promise<unknown>
  replace(opts: unknown): Promise<unknown>

  connect(opts: unknown): Promise<unknown>
  disconnect(opts: unknown): Promise<void>
}

// export interface TBDAdapter extends Adapter {}
// export interface GaiaAdapter extends Adapter {}
// export interface HyperProtocolAdapter extends Adapter {}
