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
import { getUserData, handleFollowingCheckage } from '../_actions'
import { $Enums } from '@prisma/client'
import ProfileCardSkeleton from '../components/ProfileCardSkeleton'
import UserInfoSkeleton from '../components/UserInfoSkeleton'
import UserPostsSkeleton from '../components/UserPostsSkeleton'

type Props = {
  params: { id: string }
}

export default async function Profile({ params }: Props) {
  const userData = getUserData(params.id, {
    id: true,
    name: true,
    title: true,
    description: true,
    graduations: true,
    profilePic: true,
    location: true,
    image: true,
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
      {/* NOTE - Profile Card Skeleton */}
      <Suspense fallback={<ProfileCardSkeleton />}>
        {user && <ProfileCard user={user} isOwner={isOwner} />}
      </Suspense>

      <div className="flex justify-around bg-darker-white">
        <div className="flex flex-col w-[90%] min-h-[calc(100vh-296px)] lg:w-auto lg:flex-row-reverse gap-x-8 lg:gap-x-16 ">
          {/* NOTE - Profile User Info Skeleton */}
          <Suspense fallback={<UserInfoSkeleton />}>
            {user && (
              // NOTE - This wrapper div prevents UserInfo container expansion
              <div>
                <UserInfo
                  isOwner={isOwner}
                  isFollowing={isFollowing}
                  currentUserId={session?.user.id}
                  user={user}
                />
              </div>
            )}
          </Suspense>

          {/* NOTE - Profile User Post Skeleton */}
          <Suspense fallback={<UserPostsSkeleton />}>
            {/*  NOTE - This Wrapper Div defines post width */}
            <div className="lg:w-[680px] x1:w-[800px]">
              <UserPosts
                authorID={params.id}
                currentUserData={
                  session
                    ? {
                        id: session?.user.id as string,
                        position: session?.user.position as $Enums.Positions,
                      }
                    : undefined
                }
              />
            </div>
          </Suspense>
        </div>
      </div>
    </>
  )
}
