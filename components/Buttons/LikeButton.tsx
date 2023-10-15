'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import {
  decreaseLikeCount,
  increaseLikeCount,
} from '@/app/(feed)/_serverActions'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import styles from './buttons.module.scss'

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
        className={`like flex flex-col justify-center items-center w-[48px] ${
          isLiked ? styles.liked : 'text-light-gray'
        }`}
      >
        {isLiked ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}

        <span>{optimisticLikes}</span>
      </button>
    </>
  )
}
