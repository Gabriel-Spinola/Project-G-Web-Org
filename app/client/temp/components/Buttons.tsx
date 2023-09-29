'use client'

import React, { experimental_useOptimistic as useOptimistic } from 'react'
import { deleteComment, increaseLikeCount } from '../comments/actions'
import { Session } from 'next-auth'

type LikeButtonParams = {
  params: { likes: number; targetId: string; session: Session }
}

export function LikeButton({ params }: LikeButtonParams) {
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

type DeleteButtonParams = {
  params: { id: number }
}

export function DeleteCommentButton({ params }: DeleteButtonParams) {
  return (
    <button
      onClick={async () => {
        await deleteComment(params.id)
      }}
    >
      Delete Comment
    </button>
  )
}
