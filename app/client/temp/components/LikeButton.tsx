import React, { experimental_useOptimistic as useOptimistic } from 'react'
import { increaseLikeCount } from '../comments/actions'
import { Session } from 'next-auth'

type Params = {
  params: { likes: number; id: string; session: Session }
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
        await increaseLikeCount('posts', params.session, params.id)
      }}
    >
      LikeButton {optimisticLikes}
    </button>
  )
}
