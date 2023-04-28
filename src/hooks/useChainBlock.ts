import { JsonRpcProvider } from 'ethers'

import { IChainInfo } from '@/lib'

export async function fetchChainLastBlock(chain: IChainInfo): Promise<{ lastBlock: number; chain: number }> {
  try {
    const provider = new JsonRpcProvider(chain.rpcUrl, chain.chainId)

    const lastBlock = await provider.getBlockNumber()

    return { chain: chain.chainId, lastBlock }
  } catch (error) {
    return { chain: chain.chainId, lastBlock: -1 }
  }
}
