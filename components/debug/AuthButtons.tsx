'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export const LoginButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
    </button>
  )
}

export const RegisterButton = () => {
  return (
    <Link href="/auth/register/" style={{ marginRight: 10 }}>
      Register
    </Link>
  )
}

export const LogoutButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </button>
  )
}

export const ProfileButton = () => {
  const session = useSession()

  return <Link href={`/client/profile/${session.data?.user.id}`}>Profile</Link>
}
