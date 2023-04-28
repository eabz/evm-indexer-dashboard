'use client'

import { Box, Center, Flex, HStack, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/progress'
import { Spinner } from '@chakra-ui/spinner'
import { JsonRpcProvider } from 'ethers'
import NextImage from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { chainById, chains, IChainInfo } from '@/lib/chains'

const getChainLastBlock = async (chain: IChainInfo): Promise<{ lastBlock: number; chain: string }> => {
  try {
    const provider = new JsonRpcProvider(chain.rpcUrl, chain.chainId)

    const lastBlock = await provider.getBlockNumber()

    return { chain: chain.id, lastBlock }
  } catch (error) {
    return { chain: chain.id, lastBlock: -1 }
  }
}

function ChainPanel({
  chain,
  last_block,
  indexed_blocks,
}: {
  chain: IChainInfo
  indexed_blocks: number
  last_block: number
}) {
  const progress = last_block === -1 ? 0 : (indexed_blocks / last_block) * 100

  return (
    <Box
      border="1px solid"
      borderColor="inherit"
      borderRadius="xl"
      margin="5"
      maxWidth="300px"
      padding="5"
      width="full"
    >
      <VStack alignContent="center" justifyContent="center">
        <Text fontSize="sm" fontWeight="bold" marginBottom="2">
          {chain.name}
        </Text>
        <Box>
          <NextImage alt={`${chain.name} Logo`} height="60" src={`/static/chains/${chain.logoUrl}`} width="60" />
        </Box>
        <HStack>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              Last Chain Block
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {last_block === -1 ? 'Error' : last_block}
            </Text>
          </Box>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              Indexed Blocks
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {indexed_blocks}
            </Text>
          </Box>
        </HStack>
        <Box paddingY="2">
          <CircularProgress size="90px" value={progress}>
            <Center>
              <Box position="absolute" top="34px">
                <Text fontSize="sm" fontWeight="bold" textAlign="center">
                  {last_block === -1 ? '-' : progress.toFixed(2)}%
                </Text>
              </Box>
            </Center>
          </CircularProgress>
        </Box>
      </VStack>
    </Box>
  )
}

export function ChainsBlocks() {
  const [isLoading, setLoading] = useState(true)

  const [chainsInfo, setChainsInfo] = useState<
    | {
        chain: string
        indexed_blocks: number
        last_block: number
      }[]
    | undefined
  >(undefined)

  const fetchData = useCallback(async () => {
    const chainsLastBlocksResponse = await Promise.all(chains.map((chain) => getChainLastBlock(chain)))

    const chainsLastBlocks: { [k: string]: number } = {}

    for (const chain of chainsLastBlocksResponse) {
      chainsLastBlocks[chain.chain] = chain.lastBlock
    }

    const data = await fetch('https://indexer-api.kindynos.mx/status')

    const chainsBlocks: {
      chain: string
      indexed_blocks: number
      last_block: number
    }[] = await data.json()

    const chainsInfo: {
      chain: string
      indexed_blocks: number
      last_block: number
    }[] = []

    for (const { chain, indexed_blocks: indexedBlocks } of chainsBlocks) {
      const chainData = chainById[chain]
      if (!chainData) {
        continue
      }

      chainsInfo.push({
        chain: chainData.id,
        indexed_blocks: indexedBlocks,
        last_block: chainsLastBlocks[chain],
      })
    }

    setChainsInfo(chainsInfo)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Stack paddingY="5" width="full">
      {isLoading ? (
        <HStack align="center" justifyContent="center">
          <Spinner size="xl" />
        </HStack>
      ) : (
        <Flex flexDirection="row" justifyContent="center" width="full">
          <SimpleGrid columns={{ base: 1, md: 2 }} maxWidth="600px" spacingX="5" width="full">
            {chainsInfo &&
              chainsInfo.map((chainInfo) => (
                <HStack key={`ChainInfo_${chainInfo.chain}`} justifyContent="center">
                  <ChainPanel
                    chain={chainById[chainInfo.chain]}
                    indexed_blocks={chainInfo.indexed_blocks}
                    last_block={chainInfo.last_block}
                  />
                </HStack>
              ))}
          </SimpleGrid>
        </Flex>
      )}
    </Stack>
  )
}
