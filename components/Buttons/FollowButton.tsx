'use client'

import { follow, unfollow } from '@/app/(client)/profile/_server-actions'
import { Button, background } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

type Params = {
  authorId?: string
  isFollowing: boolean
  targetId: string
}

export default function FollowButton({
  authorId,
  isFollowing,
  targetId,
}: Params) {
  const [_isFollowing, setIsFollowing] = useState(isFollowing)

  async function handleFollow() {
    if (!authorId) {
      signIn('credentials')

      return
    }

    setIsFollowing(!_isFollowing)

    if (!_isFollowing) {
      const { error } = await follow(authorId, targetId)

      if (error) {
        console.error(error)
        toast.error('Ouve ulguma falha ao seguir o usuário 😔')
      }
    } else {
      const { error } = await unfollow(authorId, targetId)

      if (error) {
        console.error(error)

        toast.error('Ouve ulguma falha ao deixar de seguir o usuário 😔')
      }
    }
  }

  return (
    <Button
      marginY={4}
      color="white"
      bg="#CB6856"
      _hover={{ background: 'white', color: '#FF7452' }}
      className="rounded-[8px] font-norma"
      onClick={handleFollow}
    >
      {_isFollowing ? 'deixar de seguir' : 'seguir'}
    </Button>
  )
}
