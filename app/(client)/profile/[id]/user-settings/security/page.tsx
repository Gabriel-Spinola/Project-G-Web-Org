import React from 'react'
import { getUserData } from '../../../_actions'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import Link from 'next/link'
import PrivacySettings from './components/ChangeEmailForm'
import ChangePasswordForm from './components/ChangePasswordForm'
import Avatar from '@/components/Avatar'
import ChangePosition from './components/ChangePostition'
import { notFound } from 'next/navigation'

type Props = {
  params: { id: string }
}

export default async function ProfileSettings({ params }: Props) {
  const { id: userId } = params

  const userData = getUserData(userId)
  const sessionData = getServerSession(AuthOptions)

  const [user, session] = await Promise.all([userData, sessionData])

  const isOwner = session?.user.id === user?.id

  if (!isOwner || !session) {
    return notFound()
  }

  return (
    <main className="w-full min-h-[calc(100vh-88px)] mt-[88px] bg-darker-white flex">
      <aside className="w-full md:w-[35vw] x1:w-[30vw] h-[calc(100vh-88px)] py-16 shadow-xl bg-medium-white">
        <section
          id="user-info"
          className="flex items-center gap-4 px-4 lg:px-8"
        >
          <Avatar
            size={'xl'}
            imageUrl={getProfilePicURL({
              profilePic: user?.profilePic as string | null,
              image: user?.image as string | null,
            })}
          />
          <h1 className="text-xl lg:text-2xl text-medium-primary font-semibold">
            {user?.name}
          </h1>
        </section>
        <ul className="flex flex-col py-16 text-xl gap-1">
          <li>
            <Link
              href={`/profile/${session?.user.id}/user-settings/exhibition`}
              className="hover:text-medium-primary hover:bg-darker-white w-full flex justify-start  px-4 lg:px-8 py-4"
            >
              Exibição
            </Link>
          </li>
          <hr />
          <li>
            <h1 className="text-medium-primary bg-darker-white w-full flex justify-start hover:cursor-pointer px-4 lg:px-8 py-4">
              Segurança
            </h1>
          </li>
        </ul>
      </aside>
      <section className="w-full p-8 bg-darker-white overflow-auto">
        <PrivacySettings user={user} />
        <div className="w-full h-1 bg-medium-primary rounded-xl my-8" />
        <ChangePasswordForm user={user} />
        <div className="w-full h-1 bg-medium-primary rounded-xl my-8" />
        <ChangePosition id={user?.id as string} />
      </section>
    </main>
  )
}
