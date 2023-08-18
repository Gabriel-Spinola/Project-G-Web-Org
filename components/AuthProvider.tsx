'use client'

import { NavLinks } from '@/constants'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
  SessionProvider,
  getProviders,
  signIn,
  useSession,
} from 'next-auth/react'
import { AppProps } from 'next/app'

type Provider = {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
  signinUrlParams?: Record<string, string> | undefined
}

type Providers = Record<string, Provider>

export default function AuthProvider() {
  //   const { data: session, status } = useSession()
  const [providers, setProviders] = useState<Providers | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()

      setProviders(res)
    }

    fetchProviders()
  }, [])

  if (providers) {
    return (
      <>
        {Object.values(providers).map((provider: Provider, i) => (
          <button
            key={i}
            title="Sign In"
            onClick={() => signIn(provider?.id)}
          />
        ))}
      </>
    )
  }
}
