import React, { Suspense } from 'react'
import { getUserData } from '@/app/(client)/profile/_actions'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import PrivacySettings from './components/ChangeEmailForm'
import ChangePasswordForm from './components/ChangePasswordForm'
import ChangePosition from './components/ChangePostition'
import { notFound } from 'next/navigation'
import { $Enums } from '@prisma/client'
import Loader from '@/components/Loader'

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
        <PrivacySettings user={user} />

        <div className="w-full h-1 bg-medium-primary rounded-xl my-8" />

        <ChangePasswordForm user={user} />

        <div className="w-full h-1 bg-medium-primary rounded-xl my-8" />

        <ChangePosition
          id={user?.id as string}
          currentPosition={user?.position as $Enums.Positions}
        />
      </Suspense>
    </section>
  )
}
