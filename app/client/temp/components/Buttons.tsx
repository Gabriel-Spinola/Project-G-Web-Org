'use client'

import React, { useState } from 'react'
import {
  decreaseLikeCount,
  deleteComment,
  increaseLikeCount,
} from '../comments/actions'
import { signIn } from 'next-auth/react'

type LikeButtonParams = {
  params: {
    likes: number
    targetId: string
    authorId?: string
    isLiked: boolean
  }
}

export function LikeButton({ params }: LikeButtonParams) {
  const [isLiked, setIsLiked] = useState<boolean>(params.isLiked)
  const [optimisticLikes, setOptimisticLikes] = useState<number>(
    params.likes || 0,
  )

  async function handleLike() {
    if (!params.authorId) {
      signIn()

      return
    }

    setIsLiked(!isLiked)

    // Update optimisticLikes based on the current state and the operation (increase or decrease)
    setOptimisticLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1))

    if (!isLiked) {
      await increaseLikeCount('postId', params.authorId, params.targetId)
    } else {
      await decreaseLikeCount(params.targetId)
    }
  }

  return (
    <>
      <button
        onClick={handleLike}
        className="like flex flex-col justify-center items-center  hover:text-medium-primary w-[48px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M20.16 5A6.29 6.29 0 0 0 12 4.36a6.27 6.27 0 0 0-8.16 9.48l6.21 6.22a2.78 2.78 0 0 0 3.9 0l6.21-6.22a6.27 6.27 0 0 0 0-8.84Zm-1.41 7.46l-6.21 6.21a.76.76 0 0 1-1.08 0l-6.21-6.24a4.29 4.29 0 0 1 0-6a4.27 4.27 0 0 1 6 0a1 1 0 0 0 1.42 0a4.27 4.27 0 0 1 6 0a4.29 4.29 0 0 1 .08 6Z"
          />
        </svg>

        <span>{optimisticLikes}</span>
      </button>
    </>
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
