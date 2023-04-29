import { useQuery } from '@tanstack/react-query'

export async function fetchChainsInfo(): Promise<
  {
    blocks: number
    chain: number
    contracts: number
    dex_trades: number
    erc20_transfers: number
    erc721_transfers: number
    erc1155_transfers: number
    transactions: number
    receipts: number
    logs: number
  }[]
> {
  const res = await fetch('https://indexer-api.kindynos.mx/status')

  const { data } = await res.json()

  return data
}

export function useChainsInfo(): {
  isLoading: boolean
  isError: boolean
  data:
    | {
        blocks: number
        chain: number
        contracts: number
        dex_trades: number
        receipts: number
        erc20_transfers: number
        erc721_transfers: number
        erc1155_transfers: number
        transactions: number
        logs: number
      }[]
    | undefined
} {
  const { isLoading, isError, data } = useQuery({
    queryFn: async () => await fetchChainsInfo(),
    queryKey: [`chains_information`],
    refetchOnWindowFocus: true,
  })

  return { data, isError, isLoading }
}
