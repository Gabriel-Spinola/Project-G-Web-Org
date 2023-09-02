import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from '@/components/debug/AuthButtons'
import AuthUsers from '@/components/debug/AuthUsers'
import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

import React from 'react'
import CreateProfile from '@/components/register/CreateProfile'

export default async function AuthTestingPage() {
  const session = await getServerSession(AuthOptions)

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2vh',
      }}
    >
      <>
        <br />
        <br />
        <br />
        <br />
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />

        <h1>Server session: </h1>
        <pre>{JSON.stringify(session)}</pre>

        <AuthUsers />

        <CreateProfile session={session} />
      </>
    </main>
  )
}
