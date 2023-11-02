import React from 'react'
import ProfileCardSkeleton from '../profile/components/ProfileCardSkeleton'
import UserInfoSkeleton from '../profile/components/UserInfoSkeleton'
import UserPostsSkeleton from '../profile/components/UserPostsSkeleton'

export default function page() {
  return (
    <main className="bg-darker-white">
      <ProfileCardSkeleton />
      <div className="flex flex-row-reverse w-full justify-center gap-8">
        <UserInfoSkeleton />
        <UserPostsSkeleton />
      </div>
    </main>
  )
}
