import { getUserData } from '@/app/(client)/profile/_actions'
import ProfileCard from '@/app/(client)/profile/components/ProfileCard'
import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { AuthOptions } from '@/lib/auth'
import { UserData } from '@/lib/types/common'
import { getServerSession } from 'next-auth'
import React, { Suspense } from 'react'

type Props = {
  params: { id: string }
}

async function getUser(id: string): Promise<UserData | null> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.users}/only/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.API_SECRET as string,
        },
        next: { tags: ['user-data'] },
      },
    )

    if (!response.ok) throw new Error('Response not ok')

    const { data }: { data: UserData } = await response.json()

    return data
  } catch (error: unknown) {
    console.error(error, 'Failed to fetch users')

    return null
  }
}

export default async function ProfilePage({ params }: Props) {
  const { id } = params

  const session = await getServerSession(AuthOptions)
  const user = await getUser(id)

  const isOwner = session?.user.id === user?.id

  return (
    <main>
      <Suspense fallback={<div>Profile card...</div>}>
        {user && <ProfileCard user={user} isOwner={isOwner} />}
      </Suspense>
    </main>
  )
}
