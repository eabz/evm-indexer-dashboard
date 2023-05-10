import { useQuery } from '@tanstack/react-query'

export async function fetchChainsInfo(): Promise<
  {
    blocks: string
    chain: string
    contracts: string
    transactions: string
    logs: string
    traces: string
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
        blocks: string
        chain: string
        contracts: string
        transactions: string
        logs: string
        traces: string
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
