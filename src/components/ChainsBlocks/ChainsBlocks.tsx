'use client'

import { Box, Center, Flex, HStack, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/progress'
import { Spinner } from '@chakra-ui/spinner'
import NextImage from 'next/image'
import { useEffect, useState } from 'react'

import { useChainLastBlock, useChainsInfo } from '@/hooks'
import { chainByChainId, IChainInfo } from '@/lib'

function ChainPanel({
  chain,
  chainData,
}: {
  chain: IChainInfo
  chainData: {
    blocks: number
    chain: number
    contracts: number
    transactions: number
    last_block: number
    logs: number
    traces: number
    erc20Transfers: number
    erc721Transfers: number
    erc1155Transfers: number
    dexTrades: number
  }
}) {
  const progress = chainData.last_block === -1 ? 0 : (chainData.blocks / chainData.last_block) * 100

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
          <NextImage alt={`${chain.name} Logo`} height="60" src={chain.logoUrl} width="60" />
        </Box>
        <HStack>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              Last Chain Block
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.last_block === -1 ? 'Error' : chainData.last_block.toLocaleString()}
            </Text>
          </Box>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              Indexed Blocks
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.blocks.toLocaleString()}
            </Text>
          </Box>
        </HStack>
        <HStack>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              Transactions
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.transactions.toLocaleString()}
            </Text>
          </Box>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              Contracts
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.contracts.toLocaleString()}
            </Text>
          </Box>
        </HStack>
        <HStack>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              Logs
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.logs.toLocaleString()}
            </Text>
          </Box>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              Traces
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.traces.toLocaleString()}
            </Text>
          </Box>
        </HStack>
        <HStack>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              ERC20 Transfers
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.erc20Transfers.toLocaleString()}
            </Text>
          </Box>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              ERC721 Transfers
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.erc721Transfers.toLocaleString()}
            </Text>
          </Box>
        </HStack>
        <HStack>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              ERC1155 Transfers
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.erc1155Transfers.toLocaleString()}
            </Text>
          </Box>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              Dex Trades
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.dexTrades.toLocaleString()}
            </Text>
          </Box>
        </HStack>
        <Box paddingY="2">
          <CircularProgress size="90px" value={progress}>
            <Center>
              <Box position="absolute" top="34px">
                <Text fontSize="sm" fontWeight="bold" textAlign="center">
                  {chainData.last_block === -1 ? '-' : progress.toFixed(2)}%
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
  const { isLoading: isLoadingChainsData, data: chainsData } = useChainsInfo()
  const { isLoading: isLoadingChainsLastBlock, data: chainsLastBlock } = useChainLastBlock()

  const [chainsInformation, setChainInformation] = useState<
    {
      blocks: number
      chain: number
      contracts: number
      transactions: number
      last_block: number
      logs: number
      traces: number
      erc20Transfers: number
      erc721Transfers: number
      erc1155Transfers: number
      dexTrades: number
    }[]
  >([])

  const [globalInformation, setGlobalInformation] = useState<
    | {
        blocks: number
        contracts: number
        transactions: number
        last_block: number
        logs: number
        traces: number
        erc20Transfers: number
        erc721Transfers: number
        erc1155Transfers: number
        dexTrades: number
      }
    | undefined
  >(undefined)

  useEffect(() => {
    if (isLoadingChainsData || isLoadingChainsLastBlock || !chainsLastBlock || !chainsData) return
    const chainsInformation: {
      blocks: number
      chain: number
      contracts: number
      transactions: number
      last_block: number
      logs: number
      traces: number
      erc20Transfers: number
      erc721Transfers: number
      erc1155Transfers: number
      dexTrades: number
    }[] = []

    const chainsLastBlocks: { [k: number]: number } = {}

    for (const chain of chainsLastBlock) {
      chainsLastBlocks[chain.chain] = chain.last_block
    }

    const globalInformation = {
      blocks: 0,
      contracts: 0,
      dexTrades: 0,
      erc20Transfers: 0,
      erc721Transfers: 0,
      erc1155Transfers: 0,
      last_block: 0,
      logs: 0,
      traces: 0,
      transactions: 0,
    }

    for (const chain of chainsData) {
      const blocks = parseInt(chain.blocks)
      const chainId = parseInt(chain.chain)
      const contracts = parseInt(chain.contracts)
      const logs = parseInt(chain.logs)
      const transactions = parseInt(chain.transactions)
      const traces = parseInt(chain.traces)
      const erc20Transfers = parseInt(chain.erc20Transfers)
      const erc721Transfers = parseInt(chain.erc721Transfers)
      const erc1155Transfers = parseInt(chain.erc1155Transfers)
      const dexTrades = parseInt(chain.dexTrades)

      chainsInformation.push({
        blocks,
        chain: chainId,
        contracts,
        dexTrades,
        erc20Transfers,
        erc721Transfers,
        erc1155Transfers,
        last_block: chainsLastBlocks[chain.chain],
        logs,
        traces,
        transactions,
      })

      globalInformation.blocks += blocks
      globalInformation.contracts += contracts
      globalInformation.logs += logs
      globalInformation.transactions += transactions
      globalInformation.traces += traces
      globalInformation.erc20Transfers += erc20Transfers
      globalInformation.erc721Transfers += erc721Transfers
      globalInformation.erc1155Transfers += erc1155Transfers
      globalInformation.dexTrades += dexTrades
    }

    setGlobalInformation(globalInformation)
    setChainInformation(chainsInformation)
  }, [chainsData, chainsLastBlock, isLoadingChainsData, isLoadingChainsLastBlock])

  return (
    <Stack paddingY="5" width="full">
      {isLoadingChainsData || isLoadingChainsLastBlock ? (
        <HStack align="center" justifyContent="center">
          <Spinner size="xl" />
        </HStack>
      ) : (
        chainsInformation &&
        globalInformation && (
          <Flex alignItems="center" flexDirection="column" justifyContent="center" width="full">
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
                  Global Information
                </Text>
                <HStack>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      Indexed Blocks
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.blocks.toLocaleString()}
                    </Text>
                  </Box>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      Traces
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.traces.toLocaleString()}
                    </Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      Transactions
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.transactions.toLocaleString()}
                    </Text>
                  </Box>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      Contracts
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.contracts.toLocaleString()}
                    </Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      ERC20 Transfers
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.erc20Transfers.toLocaleString()}
                    </Text>
                  </Box>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      ERC721 Transfers
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.erc721Transfers.toLocaleString()}
                    </Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      ERC1155 Transfers
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.erc1155Transfers.toLocaleString()}
                    </Text>
                  </Box>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      Dex Trades
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.dexTrades.toLocaleString()}
                    </Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      Logs
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.logs.toLocaleString()}
                    </Text>
                  </Box>
                </HStack>
              </VStack>
            </Box>
            <SimpleGrid columns={{ base: 1, md: 2 }} maxWidth="600px" spacingX="5" width="full">
              {chainsInformation.map((chainData) => (
                <HStack key={`ChainInfo_${chainData.chain}`} justifyContent="center">
                  <ChainPanel chain={chainByChainId[chainData.chain]} chainData={chainData} />
                </HStack>
              ))}
            </SimpleGrid>
          </Flex>
        )
      )}
    </Stack>
  )
}
