import {
  LoginButton, LogoutButton,
  ProfileButton, RegisterButton
} from '@/components/debug/AuthButtons'
import AuthUsers from '@/components/debug/AuthUsers'
import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

import React from 'react'

export default async function AuthTestingPage() {
  const session = await getServerSession(AuthOptions)
  console.log(session)

  return (
    <main>
      <>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />

        <h1>Server session: </h1>
        <pre>{JSON.stringify(session)}</pre>

        <AuthUsers />
      </>
    </main>
  )
}
