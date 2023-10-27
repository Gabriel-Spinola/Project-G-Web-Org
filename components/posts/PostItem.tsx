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
import TwoImageDisplay from './images/TwoImageDisplay'
import ThreeImageDisplay from './images/ThreeImageDisplay'
import FullPostModal from './FullPostModal'
import PostHeader from './PostHeader'
import Link from 'next/link'

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
      <div id="reacts" className="w-[100%] h-[48px] mt-4 flex flex-row">
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
        <button className="comment  flex flex-col justify-center items-center ml-8  hover:text-medium-primary w-[48px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29H9m1-6v3.08L13.08 16H20V4H4v12h6Z"
            />
          </svg>

          <span>{post.comments?.length ?? 0}</span>
        </button>

        <Link href={`/(client)/posts/${post.id}`}>Check Post</Link>
        <FullPostModal post={post} currentUserId={currentUserId} />
      </div>
    </div>
  )
}
