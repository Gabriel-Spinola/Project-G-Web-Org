import React from 'react'
import { getUserData } from '../../../_actions'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import { Avatar } from '@chakra-ui/avatar'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import Link from 'next/link'
import UpdateNameImage from './components/UpdateNameImage'
import { EditUserInfoForm } from './components/EditUserInfoForm'

type Props = {
  params: { id: string }
}

export default async function ProfileSettings({ params }: Props) {
  const { id: userId } = params

  const userData = getUserData(userId)
  const sessionData = getServerSession(AuthOptions)

  const [user, session] = await Promise.all([userData, sessionData])

  const isOwner = session?.user.id === user?.id

  if (!user) return

  if (!isOwner) return

  return (
    <main className="relative w-full h-[calc(100vh-88px)] mt-[88px] bg-darker-white flex">
      <aside className="w-full md:w-[35vw] x1:w-[30vw] py-16 shadow-xl flex flex-col bg-medium-white">
        <section
          id="user-info"
          className="flex h-full items-center gap-4 px-4 lg:px-8"
        >
          <Avatar
            size={'xl'}
            src={getProfilePicURL({
              profilePic: user.profilePic as string | null,
              image: user.image as string | null,
            })}
          />
          <h1 className="text-xl lg:text-2xl text-medium-primary font-semibold">
            {user.name}
          </h1>
        </section>
        <ul className="flex flex-col py-16 text-xl gap-1">
          <li>
            <h1 className="text-medium-primary bg-darker-white w-full flex justify-start hover:cursor-pointer px-4 lg:px-8 py-4">
              Exibição
            </h1>
          </li>
          <hr />
          <li>
            <Link
              href={`/profile/${session?.user.id}/user-settings/security`}
              className="hover:text-medium-primary hover:bg-darker-white w-full flex justify-start  px-4 lg:px-8 py-4"
            >
              Segurança
            </Link>
          </li>
        </ul>
      </aside>
      <section className="w-full md:w-[65vw] x1:w-[70vw] p-4 lg:p-8 overflow-auto">
        <UpdateNameImage user={user} />
        <div className="w-full h-1 bg-medium-primary rounded-xl my-8" />
        <EditUserInfoForm />
      </section>
    </main>
  )
}
