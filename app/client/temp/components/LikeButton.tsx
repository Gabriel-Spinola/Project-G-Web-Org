'use client'

import React, { experimental_useOptimistic as useOptimistic } from 'react'
import { increaseLikeCount } from '../comments/actions'
import { Session } from 'next-auth'

type Params = {
  params: { likes: number; targetId: string; session: Session }
}

export default function LikeButton({ params }: Params) {
  const [optimisticLikes, addOptimisticLikes] = useOptimistic(
    params.likes || 0,
    (state, l) => state + 1,
  )

  return (
    <button
      onClick={async () => {
        addOptimisticLikes(1)
        await increaseLikeCount('postId', params.session, params.targetId)
      }}
    >
      LikeButton {optimisticLikes}
    </button>
  )
}
