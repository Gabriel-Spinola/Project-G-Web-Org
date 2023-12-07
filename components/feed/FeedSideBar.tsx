import { AuthOptions } from '@/lib/auth'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import { Avatar } from '@chakra-ui/avatar'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { BsFillGearFill } from 'react-icons/bs'
import { MdPushPin } from 'react-icons/md'

export default async function FeedSideBar() {
  const session = await getServerSession(AuthOptions)
  if (session)
    return (
      <section className="hidden x1:flex x1:flex-col gap-4 x1:fixed left-0 py-8 px-4">
        <article className="flex gap-4">
          <Avatar size={'lg'} src={getProfilePicURL(session.user as User)} />
          <div className="flex flex-col justify-evenly">
            <h1 className="text-xl">{session.user.name}</h1>
            <Link
              href={`/profile/${session.user.id}`}
              className="hover:underline"
            >
              Ir para Perfil
            </Link>
          </div>
        </article>
        <article className="flex flex-col w-full gap-4">
          <Link
            className="w-full flex gap-4 justify-between items-center py-4 px-2 bg-darker-white border-b-2 border-medium-primary hover:brightness-75"
            href={`/profile/${session.user.id}/pins/`}
          >
            Veja seus posts salvos <MdPushPin size={16} />
          </Link>

          <Link
            className="w-full flex gap-4 justify-between items-center py-4 px-2 bg-darker-white border-b-2 border-medium-primary hover:brightness-75"
            href={`/profile/${session.user.id}/user-settings/exhibition`}
          >
            Configurações <BsFillGearFill size={16} />
          </Link>
        </article>
      </section>
    )
}
