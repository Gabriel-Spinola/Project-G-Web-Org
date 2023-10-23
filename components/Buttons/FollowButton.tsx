'use client'

import { follow, unfollow } from '@/app/client/profile/_server-actions'
import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'

type Params = {
  authorId: string
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
    setIsFollowing(!_isFollowing)

    if (isFollowing) {
      const { data, error } = await follow(authorId, targetId)

      if (error) {
        return alert(error)
      }

      alert(data)
    } else {
      const { data, error } = await unfollow(authorId, targetId)

      if (error) {
        return alert(error)
      }

      alert(data)
    }
  }

  return (
    <Button onClick={handleFollow}>
      {_isFollowing ? 'deixar de seguir' : 'seguir'}
    </Button>
  )
}
