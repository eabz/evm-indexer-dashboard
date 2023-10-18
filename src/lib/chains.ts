'use client'

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
    logoUrl: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/2fe40d3b-9053-4867-4832-f2a663b7de00/public',
    name: 'Ethereum',
    rpcUrl: 'https://eth.llamarpc.com',
  },
  {
    id: 'polygon',
    chainId: 137,
    logoUrl: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/aada4ce4-5b2d-47d9-c690-c3ec114a7600/public',
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com/',
  },
  {
    id: 'optimism',
    chainId: 10,
    logoUrl: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/3ebd6907-4d52-4852-1ab2-0f969dba0f00/public',
    name: 'Optimism',
    rpcUrl: 'https://mainnet.optimism.io/',
  },
  {
    id: 'bsc',
    chainId: 56,
    logoUrl: 'https://imagedelivery.net/vgqvCj4Mw_NLJNB76Px9jg/e0b40bb2-166f-41d1-6d5a-14266fd0fe00/public',
    name: 'BNB Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
  },
]

export const chainByChainId: { [key: number]: IChainInfo } = {}

for (const chain of chains) {
  chainByChainId[chain.chainId] = chain
}
