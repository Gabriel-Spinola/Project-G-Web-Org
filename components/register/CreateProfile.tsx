'use client'

import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import React, { ChangeEvent, useState } from 'react'

interface ICreateProfileProps {
  session: Session | null
}

export default function CreateProfile({ session }: ICreateProfileProps) {
  const [username, setUsername] = useState<string>(session?.user.name ?? '')

  async function onSubmit() {
    try {
      /**
       * mutation to createUsername into graphql api
       */
    } catch (error: unknown) {
      console.error('onSubmit failed', error)
    }
  }

  return (
    <div className="flex flex-col text-center">
      {session ? (
        <>
          <h1>Create User</h1>
          <input
            type="text"
            value={username}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value)
            }
          />
          <button onClick={onSubmit}>Salvar</button>
        </>
      ) : (
        <>
          <h1>Update Maybe</h1>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </div>
  )
}
