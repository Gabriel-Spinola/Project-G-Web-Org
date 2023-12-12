import React, { Suspense } from 'react'
import { getUserData } from '@/app/(client)/profile/_actions'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import { notFound } from 'next/navigation'
import Loader from '@/components/Loader'
import dynamic from 'next/dynamic'
import { EditUserInfoForm } from './components/EditUserInfoForm'

const DynamicUpdateImage = dynamic(
  () => import('./components/UpdateNameImage'),
  { loading: () => <Loader /> },
)

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
    <section className="w-full p-8 bg-darker-white overflow-auto ">
      <Suspense fallback={<Loader />}>
        <DynamicUpdateImage user={user} />
      </Suspense>

      <div className="w-full h-1 bg-medium-primary rounded-xl my-8" />

      <Suspense fallback={<Loader />}>
        <EditUserInfoForm user={user} />
      </Suspense>
    </section>
  )
}
