import React from 'react'
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
      <main className="w-full h-[calc(100vh-88px)] bg-darker-white flex flex-col">
        <aside className="w-full md:w-[35%] h-full max-h-[calc(100vh-88px)] bg-darker-primary p-4 lg:p-0 lg:px-8 lg:py-16">
          <section id="user-info" className="flex">
            <Avatar
              size={'xl'}
              src={getProfilePicURL({
                profilePic: user?.profilePic as string | null,
                image: user?.image as string | null,
              })}
            />
            <h1 className="text-xl">{user?.name}</h1>
          </section>
          <ul className="flex flex-col gap-4 py-16">
            <li>Exibição</li>
            <li>Privacidade</li>
            <li>Segurança</li>
          </ul>
        </aside>
        <section></section>
      </main>
    )
  }
}
