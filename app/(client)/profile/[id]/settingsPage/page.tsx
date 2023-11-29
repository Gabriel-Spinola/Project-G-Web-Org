import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function ProfileSettings() {
  const session = await getServerSession(AuthOptions)
  return <main className="w-screen h-[calc(100vh-88p)] bg-darker-white"></main>
}
