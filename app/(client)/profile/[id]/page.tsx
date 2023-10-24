/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import UserPosts from '@/app/(client)/profile/components/UserPosts'
import ProfileCard from '@/app/(client)/profile/components/ProfileCard'
import React, { Suspense } from 'react'
import UserInfo from '@/app/(client)/profile/components/UserInfo'
import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { getUserData } from '../_server-actions'
import { handleFollowingCheckage } from '../_actions'

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
  const isFollowing = await handleFollowingCheckage(
    session?.user.id as string,
    user?.id as string,
    isOwner,
  )

  return (
    <>
      {/* TODO - Add skeleton */}
      <Suspense fallback={<div>Loading profile card...</div>}>
        {user && <ProfileCard user={user} isOwner={isOwner} />}
      </Suspense>

      <div className="flex justify-around bg-darker-white">
        <div className="flex flex-col w-[90%] lg:w-auto lg:flex-row-reverse gap-x-8 lg:gap-x-16 ">
          {/* TODO - Add skeleton */}
          <Suspense fallback={<div>Loading userInfo...</div>}>
            {user && (
              <UserInfo
                isOwner={isOwner}
                isFollowing={isFollowing}
                currentUserId={session?.user.id as string}
                user={user}
              />
            )}
          </Suspense>

          {/* TODO - Add skeleton */}
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
}
