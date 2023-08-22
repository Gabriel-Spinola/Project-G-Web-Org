'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Explore() {
  const { data: session } = useSession()

  return (
    <main>
      <h1>{session?.user?.name}</h1>
    </main>
  )
}
