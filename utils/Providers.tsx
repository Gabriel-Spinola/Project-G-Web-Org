'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}

function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </SessionProvider>
  )
}

export default Providers
