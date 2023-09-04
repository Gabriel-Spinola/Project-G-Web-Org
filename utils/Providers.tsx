'use client'

import React, { useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}

function Providers({ children }: Props) {
  // const [client] = useState(new QueryClient())

  return (
    <SessionProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </SessionProvider>
  )
}

export default Providers
