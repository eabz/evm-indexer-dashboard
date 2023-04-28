'use client'

import { Box, Center, Heading, Text, VStack } from '@chakra-ui/layout'
import Link from 'next/link'

import { ChainsBlocks } from '@/components'

export default function Home() {
  return (
    <Center height="calc(100vh)" width="calc(100vw)">
      <VStack>
        <Text fontSize="2xl" fontWeight="bold" marginTop="10" textAlign="center">
          <Link href="/">
            <Heading>EVM Indexer</Heading>
          </Link>
        </Text>

        <Box width="full">
          <Text fontSize="md" fontWeight="regular" padding="2" textAlign="center">
            Chains Indexed
          </Text>
          <ChainsBlocks />
        </Box>
      </VStack>
    </Center>
  )
}
