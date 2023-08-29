import {
  LoginButton, LogoutButton,
  ProfileButton, RegisterButton
} from '@/components/debug/AuthButtons'
import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

import React from 'react'

export default async function AuthTestingPage() {
  const session = await getServerSession(AuthOptions)
  console.log(session)

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />

        <br />

        <h1>Server session: </h1>
        <pre>{JSON.stringify(session)}</pre>
      </div>
    </main>
  )
}
