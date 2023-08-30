import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Chat() {
  const session = await getServerSession(AuthOptions)
  return (
    <div>Chat</div>
  )
}
