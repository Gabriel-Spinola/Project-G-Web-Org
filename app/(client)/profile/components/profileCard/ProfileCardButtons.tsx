import FollowButton from '@/components/Buttons/FollowButton'
import { Button } from '@chakra-ui/react'
import React from 'react'

type Props = {
  isOwner: boolean
  currentUserId?: string
  isFollowing: boolean
  userId: string
}

export default function ProfileCardButtons({
  isOwner,
  currentUserId,
  isFollowing,
  userId,
}: Props) {
  return (
    <>
      {!isOwner && (
        <>
          <FollowButton
            authorId={currentUserId}
            isFollowing={isFollowing}
            targetId={userId}
          />

          <Button
            marginY={4}
            color="#FF7452"
            bg="white"
            _hover={{ background: '#FF7452', color: 'white' }}
            className="rounded-[8px] font-normal"
          >
            Enviar mensagem
          </Button>
        </>
      )}
    </>
  )
}
