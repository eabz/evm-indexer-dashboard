'use client'

import { Box, Center, Flex, HStack, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/progress'
import { Spinner } from '@chakra-ui/spinner'
import NextImage from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { fetchChainLastBlock } from '@/hooks'
import { chainByChainId, chains, IChainInfo } from '@/lib'

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
          <NextImage alt={`${chain.name} Logo`} height="60" src={`/images/chains/${chain.logoUrl}`} width="60" />
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
        chain: number
        indexed_blocks: number
        last_block: number
      }[]
    | undefined
  >(undefined)

  const fetchData = useCallback(async () => {
    const chainsLastBlocksResponse = await Promise.all(chains.map((chain) => fetchChainLastBlock(chain)))

    const chainsLastBlocks: { [k: number]: number } = {}

    for (const chain of chainsLastBlocksResponse) {
      chainsLastBlocks[chain.chain] = chain.lastBlock
    }

    const data = await fetch('https://indexer-api.kindynos.mx/status')

    const chainsBlocks: {
      data: {
        chain: number
        indexed_blocks: number
      }[]
    } = await data.json()

    const chainsInfo: {
      chain: number
      indexed_blocks: number
      last_block: number
    }[] = []

    for (const { chain, indexed_blocks: indexedBlocks } of chainsBlocks.data) {
      const chainData = chainByChainId[chain]
      if (!chainData) {
        continue
      }

      chainsInfo.push({
        chain: chainData.chainId,
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
                    chain={chainByChainId[chainInfo.chain]}
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
