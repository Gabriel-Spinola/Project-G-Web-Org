'use client'

import { useSession } from 'next-auth/react'

export default function Explore() {
  const { data: session } = useSession()

  return (
    <main>
      <h1>{session?.user?.name}</h1>
    </main>
  )
}
