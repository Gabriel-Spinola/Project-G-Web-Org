import { getUserData } from '@/app/(client)/profile/_actions'
import ProfileCard from '@/app/(client)/profile/components/ProfileCard'
import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React, { Suspense } from 'react'

type Props = {
  params: { id: string }
}

export default async function ProfilePage({ params }: Props) {
  const { id } = params

  const session = await getServerSession(AuthOptions)
  const user = await getUserData(id, {
    id: true,
    name: true,
    title: true,
    description: true,
    graduations: true,
    profilePic: true,
    location: true,
    image: true,
  })

  const isOwner = session?.user.id === user?.id

  return (
    <main>
      <Suspense fallback={<div>Profile card...</div>}>
        {user && <ProfileCard user={user} isOwner={isOwner} />}
      </Suspense>
    </main>
  )
}
