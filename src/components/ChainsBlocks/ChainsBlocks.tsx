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
    dex_trades: number
    erc20_transfers: number
    erc721_transfers: number
    receipts: number
    last_block: number
    logs: number
    erc1155_transfers: number
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
          <NextImage alt={`${chain.name} Logo`} height="60" src={`/images/chains/${chain.logoUrl}`} width="60" />
        </Box>
        <HStack>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              Last Chain Block
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.last_block === -1 ? 'Error' : chainData.last_block}
            </Text>
          </Box>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              Indexed Blocks
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.blocks}
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
              Receipts
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.receipts.toLocaleString()}
            </Text>
          </Box>
        </HStack>
        <HStack>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              Contracts
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.contracts.toLocaleString()}
            </Text>
          </Box>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              ERC20 Transfers
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.erc20_transfers.toLocaleString()}
            </Text>
          </Box>
        </HStack>
        <HStack>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              DEX Trades
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.dex_trades.toLocaleString()}
            </Text>
          </Box>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              ERC721 Transfers
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.erc721_transfers.toLocaleString()}
            </Text>
          </Box>
        </HStack>
        <HStack>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              ERC1155 Transfers
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.erc1155_transfers.toLocaleString()}
            </Text>
          </Box>
          <Box width="120px">
            <Text fontSize="xs" textAlign="center">
              Logs
            </Text>
            <Text fontSize="xs" fontWeight="bold" textAlign="center">
              {chainData.logs.toLocaleString()}
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
      dex_trades: number
      erc20_transfers: number
      erc721_transfers: number
      transactions: number
      last_block: number
      receipts: number
      logs: number
      erc1155_transfers: number
    }[]
  >([])

  useEffect(() => {
    if (isLoadingChainsData || isLoadingChainsLastBlock || !chainsLastBlock || !chainsData) return
    const chainsInformation: {
      blocks: number
      chain: number
      contracts: number
      dex_trades: number
      erc20_transfers: number
      erc721_transfers: number
      transactions: number
      last_block: number
      receipts: number
      logs: number
      erc1155_transfers: number
    }[] = []

    const chainsLastBlocks: { [k: number]: number } = {}

    for (const chain of chainsLastBlock) {
      chainsLastBlocks[chain.chain] = chain.last_block
    }

    for (const chain of chainsData) {
      chainsInformation.push({
        blocks: chain.blocks,
        chain: chain.chain,
        contracts: chain.contracts,
        dex_trades: chain.dex_trades,
        erc20_transfers: chain.erc20_transfers,
        erc721_transfers: chain.erc721_transfers,
        erc1155_transfers: chain.erc1155_transfers,
        last_block: chainsLastBlocks[chain.chain],
        logs: chain.logs,
        receipts: chain.receipts,
        transactions: chain.transactions,
      })
    }

    setChainInformation(chainsInformation)
  }, [chainsData, chainsLastBlock, isLoadingChainsData, isLoadingChainsLastBlock])

  return (
    <Stack paddingY="5" width="full">
      {isLoadingChainsData || isLoadingChainsLastBlock ? (
        <HStack align="center" justifyContent="center">
          <Spinner size="xl" />
        </HStack>
      ) : (
        chainsInformation && (
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
                      {chainsInformation.reduce((a, b) => {
                        return a + b.blocks
                      }, 10)}
                    </Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      Transactions
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {chainsInformation.reduce((a, b) => {
                        return a + b.transactions
                      }, 10)}
                    </Text>
                  </Box>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      Receipts
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {chainsInformation.reduce((a, b) => {
                        return a + b.receipts
                      }, 10)}
                    </Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      Contracts
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {chainsInformation.reduce((a, b) => {
                        return a + b.contracts
                      }, 10)}
                    </Text>
                  </Box>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      ERC20 Transfers
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {chainsInformation.reduce((a, b) => {
                        return a + b.erc20_transfers
                      }, 10)}
                    </Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      DEX Trades
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {chainsInformation.reduce((a, b) => {
                        return a + b.dex_trades
                      }, 10)}
                    </Text>
                  </Box>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      ERC721 Transfers
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {chainsInformation.reduce((a, b) => {
                        return a + b.erc721_transfers
                      }, 10)}
                    </Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      ERC1155 Transfers
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {chainsInformation.reduce((a, b) => {
                        return a + b.erc1155_transfers
                      }, 10)}
                    </Text>
                  </Box>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      Logs
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {chainsInformation.reduce((a, b) => {
                        return a + b.logs
                      }, 10)}
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
