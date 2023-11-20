/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

'use client'

import React, { useContext } from 'react'
import styles from '@/components/posts/PostItem.module.scss'
import { getPostImageUrl } from '@/lib/storage/supabase'
import { LikeButton } from '../Buttons/LikeButton'
import { Like } from '@prisma/client'
import OneImageDisplay from './images/OneImageDisplay'
import ThreeImageDisplay from './images/ThreeImageDisplay'
import PostHeader from './PostHeader'
import CommentModal from '../comments/CommentModal'
import TwoImageDisplay from './images/TwoImageDisplay'
import { PublicationContext } from './InfiniteScrollPosts'

export default function PostItem() {
  const publicationCtx = useContext(PublicationContext)

  if (!publicationCtx) {
    return <></>
  }

  const isOwner = publicationCtx.session === publicationCtx.authorId

  // Check if the current user liked the post
  const isLiked: boolean = publicationCtx.likes.some(
    (like: Partial<Like>) => like.userId === publicationCtx.session,
  )

  return (
    <div className={styles.post}>
      <PostHeader post={publicationCtx} isOwner={isOwner} />

      <article className="text-medium-gray text-lg font-light leading-8 mb-3 whitespace-pre-wrap">
        {publicationCtx?.content}
      </article>

      {publicationCtx.images.length === 1 ? (
        <>
          <OneImageDisplay
            imgSrc={getPostImageUrl(publicationCtx.images[0])}
            width={776}
            height={776}
          />
        </>
      ) : publicationCtx.images.length === 2 ? (
        <>
          <TwoImageDisplay
            imgSrc={getPostImageUrl(publicationCtx.images[0])}
            secondImgSrc={getPostImageUrl(publicationCtx.images[1])}
            width={384}
            height={480}
          />
        </>
      ) : publicationCtx.images.length === 3 ? (
        <>
          <ThreeImageDisplay
            imgSrc={getPostImageUrl(publicationCtx.images[0])}
            secondImgSrc={getPostImageUrl(publicationCtx.images[1])}
            thirdImgSrc={getPostImageUrl(publicationCtx.images[2])}
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
            likes: publicationCtx.likes?.length ?? 0,
            targetId: publicationCtx.id,
            isLiked,
          }}
        />

        {/* Comments */}
        <CommentModal
          commentNumber={publicationCtx.comments?.length ?? 0}
          publication={publicationCtx}
          targetType="postId"
        />
      </div>
    </div>
  )
}
