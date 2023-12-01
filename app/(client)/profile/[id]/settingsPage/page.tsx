import React, { useState } from 'react'
import { getUserData } from '../../_actions'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import { Avatar } from '@chakra-ui/avatar'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'

type Props = {
  params: { id: string }
}

export default async function ProfileSettings({ params }: Props) {
  const { id: userId } = params

  const userData = getUserData(userId)
  const sessionData = getServerSession(AuthOptions)

  const [user, session] = await Promise.all([userData, sessionData])

  const isOwner = session?.user.id === user?.id

  if (isOwner) {
    return (
      <main className="w-full h-[calc(100vh-88px)] mt-[88px] bg-darker-white flex flex-col">
        <aside className="w-full md:w-[35vw] x1:w-[30vw] h-full max-h-[calc(100vh-88px)] px-4 py-16 lg:px-8 shadow-xl">
          <section id="user-info" className="flex items-center gap-4">
            <Avatar
              size={'xl'}
              src={getProfilePicURL({
                profilePic: user?.profilePic as string | null,
                image: user?.image as string | null,
              })}
            />
            <h1 className="text-xl lg:text-2xl text-medium-primary font-semibold">
              {user?.name}
            </h1>
          </section>
          <ul className="flex flex-col gap-4 py-16 text-xl">
            <li>
              <button className="hover:text-medium-primary">Exibição</button>
            </li>
            <li className="hover:text-medium-primary">
              <button className="hover:text-medium-primary">Privacidade</button>
            </li>
            <li className="hover:text-medium-primary">
              <button className="hover:text-medium-primary">Segurança</button>
            </li>
          </ul>
        </aside>
        <section></section>
      </main>
    )
  }
}
