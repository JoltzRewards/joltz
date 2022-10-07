import type { Adapter, Bridge } from './types'
import { StorageProviders } from './types'

export class StorageBridge implements Bridge {
  adapter: Adapter
  constructor() {
    this.adapter = {
      identifier: StorageProviders.GAIA,
    }
  }
}
