import { useQuery } from '@tanstack/react-query'
import { JsonRpcProvider } from 'ethers'

import { chains, IChainInfo } from '@/lib'

export async function fetchChainLastBlock(chain: IChainInfo): Promise<{ last_block: number; chain: number }> {
  try {
    const provider = new JsonRpcProvider(chain.rpcUrl, chain.chainId)

    const lastBlock = await provider.getBlockNumber()

    return { chain: chain.chainId, last_block: lastBlock }
  } catch (error) {
    return { chain: chain.chainId, last_block: -1 }
  }
}

export async function fetchChainsLastBlock(): Promise<{ last_block: number; chain: number }[]> {
  const chainsLastBlocksResponse = await Promise.all(chains.map((chain) => fetchChainLastBlock(chain)))

  return chainsLastBlocksResponse
}

export function useChainLastBlock(): {
  isLoading: boolean
  isError: boolean
  data: { last_block: number; chain: number }[] | undefined
} {
  const { isLoading, isError, data } = useQuery({
    queryFn: async () => await fetchChainsLastBlock(),
    queryKey: [`chain_last_block`],
    refetchOnWindowFocus: true,
  })

  return { data, isError, isLoading }
}
