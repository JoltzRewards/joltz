import {
  StacksTestnet,
  StacksMainnet,
  StacksMocknet,
  NetworkConfig,
} from '@stacks/network'

const getNetwork = (
  env: 'test' | 'development' | 'production',
  options?: NetworkConfig,
) => {
  if (env === 'test') {
    return new StacksMocknet(options)
  }

  if (env === 'production') {
    return new StacksMainnet(options)
  }

  return new StacksTestnet(options)
}

const getSocketAddress = (env: 'test' | 'development' | 'production') => {
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

export const NETWORK = getNetwork(process.env.NODE_ENV)
export const IS_MAINNET = NETWORK.isMainnet()
export const SOCKET_URL = getSocketAddress(process.env.NODE_ENV)
