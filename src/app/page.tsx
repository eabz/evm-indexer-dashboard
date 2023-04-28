'use client'

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/layout'

import { ChainsBlocks } from '@/components'

export default function Home() {
  return (
    <Container height="calc(100vh)" width="calc(100vw)">
      <VStack>
        <Heading fontSize="2xl" fontWeight="bold" marginTop="10" textAlign="center">
          EVM Indexer
        </Heading>

        <Box width="full">
          <Text fontSize="md" fontWeight="regular" padding="2" textAlign="center">
            Chains Indexed
          </Text>
          <ChainsBlocks />
        </Box>
      </VStack>
    </Container>
  )
}
