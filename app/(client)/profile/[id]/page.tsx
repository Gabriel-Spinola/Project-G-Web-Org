/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import ProfileCard from '@/app/(client)/profile/components/ProfileCard'
import React, { Suspense } from 'react'
import UserInfo from '@/app/(client)/profile/components/UserInfo'
import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { getUserData, handleFollowingCheckage } from '../_actions'
import ProfileCardSkeleton from '../components/skeletons/ProfileCardSkeleton'
import UserInfoSkeleton from '../components/skeletons/UserInfoSkeleton'
import UserPostsSkeleton from '../components/skeletons/UserPostsSkeleton'
import ProfileFeedController from '../components/ProfileFeedController'

type Props = {
  params: { id: string }
}

export default async function Profile({ params }: Props) {
  const { id: userId } = params

  const userData = getUserData(userId)
  const sessionData = getServerSession(AuthOptions)

  const [user, session] = await Promise.all([userData, sessionData])

  const isOwner = session?.user.id === user?.id
  const isFollowing = await handleFollowingCheckage(
    session?.user.id as string,
    user?.id as string,
    isOwner,
  )

  if (!user) {
    return <>User not found!</>
  }

  return (
    <main className="mt-[88px]">
      {/* NOTE - Profile Card Skeleton */}
      <Suspense fallback={<ProfileCardSkeleton />}>
        {user && (
          <ProfileCard
            isOwner={isOwner}
            currentUserId={session?.user.id}
            user={user}
            isFollowing={isFollowing}
          />
        )}
      </Suspense>

      <div className="flex justify-around bg-darker-white">
        <div className="flex flex-col w-[90%] min-h-[calc(100vh-296px)] lg:w-auto lg:flex-row-reverse gap-x-4 lg:gap-x-8 ">
          {/* NOTE - Profile User Info Skeleton */}
          <Suspense fallback={<UserInfoSkeleton />}>
            {user && (
              // NOTE - This wrapper div prevents UserInfo container expansion
              <div className="flex flex-col gap-8">
                <UserInfo isOwner={isOwner} user={user} />
              </div>
            )}
          </Suspense>

          {/*  NOTE - This Wrapper Div defines post width */}
          <div className="lg:w-[680px] x1:w-[800px]">
            <Suspense fallback={<UserPostsSkeleton />}>
              <ProfileFeedController authorId={userId} isOwner={isOwner} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
