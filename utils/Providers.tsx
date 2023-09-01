'use client'

import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient())

  return (
    <SessionProvider>
      <ChakraProvider>
        <QueryClientProvider client={client}>
          <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>

          <ReactQueryDevtools
            initialIsOpen={process.env.NODE_ENV === 'development'}
          />
        </QueryClientProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default Providers
