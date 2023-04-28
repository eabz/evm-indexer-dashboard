'use client'

/* eslint-disable no-restricted-imports */
import './fonts.css'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/provider'
import { extendTheme } from '@chakra-ui/react'
import { ReactNode } from 'react'

export const fonts = {
  body: `muli, sans-serif`,
  heading: `all-round-gothic, sans-serif`,
}

export const theme = extendTheme({
  colors: {
    gray: '#595958',
    primary: '#702F8A',
    secondary: '#426DA9',
  },
  fonts,
  styles: {
    global: {
      body: {
        color: 'secondary',
      },
    },
  },
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </>
  )
}
