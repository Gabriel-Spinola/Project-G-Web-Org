import { UserData } from '@/lib/types/common'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import { Avatar } from '@chakra-ui/avatar'
import { User } from '@prisma/client'
import dynamic from 'next/dynamic'
import React from 'react'

const DynamicEditableAvatar = dynamic(() => import('../EditableAvatar'))

type Props = {
  isOwner: boolean
  user: Partial<UserData>
}

export default function ProfileAvatar({ isOwner, user }: Props) {
  return (
    <>
      {isOwner ? (
        <DynamicEditableAvatar
          profileId={user.id as string}
          profilePicUrl={
            getProfilePicURL({
              profilePic: user.profilePic as string | null,
              image: user.image as string | null,
            }) ?? ''
          }
        />
      ) : (
        <div>
          <Avatar size={'2xl'} src={getProfilePicURL(user as User)} />
        </div>
      )}
    </>
  )
}
