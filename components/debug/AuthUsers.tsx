'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

export default function AuthUsers() {
  const { data: session } = useSession()

  return (
    <>
      <h1>Client Session</h1>
      <pre>{JSON.stringify(session)}</pre>
    </>
  )
}
