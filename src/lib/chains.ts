export interface IChainInfo {
  id: string
  chainId: number
  name: string
  logoUrl: string
  rpcUrl: string
}

export const chains: IChainInfo[] = [
  {
    id: 'ethereum',
    chainId: 1,
    logoUrl: 'ethereum-logo.svg',
    name: 'Ethereum',
    rpcUrl: 'https://rpc.ankr.com/eth',
  },
  {
    id: 'polygon',
    chainId: 137,
    logoUrl: 'polygon-logo.svg',
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com/',
  },
  {
    id: 'optimism',
    chainId: 10,
    logoUrl: 'optimism-logo.svg',
    name: 'Optimism',
    rpcUrl: 'https://mainnet.optimism.io/',
  },
  {
    id: 'bsc',
    chainId: 56,
    logoUrl: 'bnbchain-logo.svg',
    name: 'BNB Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
  },
]

export const chainById: { [key: string]: IChainInfo } = {}

for (const chain of chains) {
  chainById[chain.id] = chain
}
