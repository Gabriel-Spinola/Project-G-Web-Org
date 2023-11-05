/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

import React from 'react'
import styles from '@/components/posts/PostItem.module.scss'
import { FullPost } from '@/lib/types/common'
import { getPostImageUrl } from '@/lib/storage/supabase'
import { LikeButton } from '../Buttons/LikeButton'
import { $Enums, Like } from '@prisma/client'
import OneImageDisplay from './images/OneImageDisplay'
import ThreeImageDisplay from './images/ThreeImageDisplay'
import PostHeader from './PostHeader'
import CommentModal from './CommentModal'
import TwoImageDisplay from './images/TwoImageDisplay'

interface Params {
  post: FullPost
  currentUserId?: string
  currentUserPosition?: $Enums.Positions
}

export default function PostItem({
  post,
  currentUserId,
  currentUserPosition,
}: Params) {
  const isOwner = currentUserId === post.authorId

  // Check if the current user liked the post
  const isLiked: boolean = post.likes.some(
    (like: Partial<Like>) => like.userId === currentUserId,
  )

  return (
    <div className={styles.post}>
      <PostHeader
        post={post}
        currentUserPosition={currentUserPosition}
        isOwner={isOwner}
      />

      <article className="text-medium-gray text-lg font-light leading-8 mb-3 whitespace-pre-wrap">
        {post?.content}
      </article>
      {post.images.length === 1 ? (
        <>
          <OneImageDisplay
            imgSrc={getPostImageUrl(post.images[0])}
            width={776}
            height={776}
          />
        </>
      ) : post.images.length === 2 ? (
        <>
          <TwoImageDisplay
            imgSrc={getPostImageUrl(post.images[0])}
            secondImgSrc={getPostImageUrl(post.images[1])}
            width={384}
            height={480}
          />
        </>
      ) : post.images.length === 3 ? (
        <>
          <ThreeImageDisplay
            imgSrc={getPostImageUrl(post.images[0])}
            secondImgSrc={getPostImageUrl(post.images[1])}
            thirdImgSrc={getPostImageUrl(post.images[2])}
            width={384}
            height={240}
            heightOne={480}
          />
        </>
      ) : null}

      {/* Likes */}
      <div id="reacts" className="w-[100%] h-[48px] gap-4 mt-4 flex flex-row">
        <LikeButton
          params={{
            option: 'postId',
            likes: post.likes?.length ?? 0,
            targetId: post.id,
            authorId: currentUserId,
            isLiked,
          }}
        />

        {/* Comments */}
        <CommentModal
          commentNumber={post.comments?.length ?? 0}
          post={post}
          currentUserId={currentUserId}
        />
      </div>
    </div>
  )
}
