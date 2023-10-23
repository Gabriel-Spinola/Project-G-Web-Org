/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import UserPosts from '@/app/client/profile/components/UserPosts'
import ProfileCard from '@/app/client/profile/components/ProfileCard'
import React, { Suspense } from 'react'
import UserInfo from '@/app/client/profile/components/UserInfo'
import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { getUserData } from '../_server-actions'
import { UserData } from '@/lib/types/common'

type Props = {
  params: { id: string }
}

// FIXME - Suspense not working properly
export default async function Profile({ params }: Props) {
  const userData = getUserData(params.id, {
    id: true,
    name: true,
    title: true,
    description: true,
    graduations: true,
    location: true,
  })

  const sessionData = getServerSession(AuthOptions)

  const [user, session] = await Promise.all([userData, sessionData])
  const isOwner = session?.user.id === user?.id

  return (
    <>
      <Suspense fallback={<div>Loading profile card...</div>}>
        {user && <ProfileCard user={user} isOwner={isOwner} />}
      </Suspense>

      <div className="flex justify-around bg-darker-white">
        <div className="flex flex-col w-[90%] lg:w-auto lg:flex-row-reverse gap-x-8 lg:gap-x-16 ">
          <Suspense fallback={<div>Loading userInfo...</div>}>
            {user && (
              <UserInfo
                isOwner={isOwner}
                currentUser={session?.user.id as string}
                user={user}
                work={'Senai CTTI'}
              />
            )}
          </Suspense>

          <Suspense fallback={<div>Loading userPosts...</div>}>
            <UserPosts
              authorID={params.id}
              currentUserPosition={session?.user.position}
            />
          </Suspense>
        </div>
      </div>
    </>
  )

  // return <h1>User not found</h1>
}
