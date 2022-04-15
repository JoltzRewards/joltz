import { StacksTestnet, StacksMainnet, StacksMocknet, NetworkConfig } from '@stacks/network'

const getNetwork = (env: 'test' | 'development' | 'production', options?: NetworkConfig) => {
  if (env === 'test') {
    return new StacksMocknet(options)
  }

  if (env === 'production') {
    return new StacksMainnet(options)
  }

  return new StacksTestnet(options)
}

const getSocketUrl = (env: 'test' | 'development' | 'production') => {
  switch (env) {
    case 'development':
    case 'test':
      return 'wss://stacks-node-api.testnet.stacks.co/'
    case 'production':
      return 'wss://stacks-node-api.mainnet.stacks.co/'
    default:
      return 'wss://stacks-node-api.testnet.stacks.co/'
  }
}

const getApiUrl = (env: 'test' | 'development' | 'production') => {
  switch (env) {
    case 'development':
    case 'test':
      return 'https://stacks-node-api.testnet.stacks.co'
    case 'production':
      return 'https://stacks-node-api.mainnet.stacks.co'
    default:
      return 'https://stacks-node-api.testnet.stacks.co'
  }
}

export const NETWORK = getNetwork(process.env.NODE_ENV)
export const IS_MAINNET = NETWORK.isMainnet()
export const SOCKET_URL = getSocketUrl(process.env.NODE_ENV)
export const API_URL = getApiUrl(process.env.NODE_ENV)
