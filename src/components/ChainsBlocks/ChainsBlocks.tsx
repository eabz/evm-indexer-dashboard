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

  const [globalInformation, setGlobalInformation] = useState<
    | {
        blocks: number
        contracts: number
        dex_trades: number
        erc20_transfers: number
        erc721_transfers: number
        transactions: number
        last_block: number
        receipts: number
        logs: number
        erc1155_transfers: number
      }
    | undefined
  >(undefined)

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

    const globalInformation = {
      blocks: 0,
      contracts: 0,
      dex_trades: 0,
      erc20_transfers: 0,
      erc721_transfers: 0,
      erc1155_transfers: 0,
      last_block: 0,
      logs: 0,
      receipts: 0,
      transactions: 0,
    }

    for (const chain of chainsData) {
      const blocks = parseInt(chain.blocks)
      const chainId = parseInt(chain.chain)
      const contracts = parseInt(chain.contracts)
      const dexTrades = parseInt(chain.dex_trades)
      const erc20Transfers = parseInt(chain.erc20_transfers)
      const erc721Transfers = parseInt(chain.erc721_transfers)
      const erc1155Transfers = parseInt(chain.erc1155_transfers)
      const logs = parseInt(chain.logs)
      const receipts = parseInt(chain.receipts)
      const transactions = parseInt(chain.transactions)

      chainsInformation.push({
        blocks,
        chain: chainId,
        contracts,
        dex_trades: dexTrades,
        erc20_transfers: erc20Transfers,
        erc721_transfers: erc721Transfers,
        erc1155_transfers: erc1155Transfers,
        last_block: chainsLastBlocks[chain.chain],
        logs,
        receipts,
        transactions,
      })

      globalInformation.blocks += blocks
      globalInformation.contracts += contracts
      globalInformation.dex_trades += dexTrades
      globalInformation.erc20_transfers += erc20Transfers
      globalInformation.erc721_transfers += erc721Transfers
      globalInformation.erc1155_transfers += erc1155Transfers
      globalInformation.logs += logs
      globalInformation.receipts += receipts
      globalInformation.transactions += transactions
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
                      Receipts
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.receipts.toLocaleString()}
                    </Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      Contracts
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.contracts.toLocaleString()}
                    </Text>
                  </Box>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      ERC20 Transfers
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.erc20_transfers.toLocaleString()}
                    </Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      DEX Trades
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.dex_trades.toLocaleString()}
                    </Text>
                  </Box>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      ERC721 Transfers
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.erc721_transfers.toLocaleString()}
                    </Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box width="120px">
                    <Text fontSize="xs" textAlign="center">
                      ERC1155 Transfers
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" textAlign="center">
                      {globalInformation.erc1155_transfers.toLocaleString()}
                    </Text>
                  </Box>
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
