export * from '@stacks/blockchain-api-client'

declare module '@stacks/blockchain-api-client' {
  export interface Subscription {
    unsubscribe(): Promise<void>
  }
}
