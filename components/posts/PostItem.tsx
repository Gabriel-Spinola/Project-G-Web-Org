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
import { LikeButton } from '../Buttons/LikeButton'
import { Like } from '@prisma/client'
import PostHeader from './PostHeader'
import CommentModal from '../comments/CommentModal'
import { PublicationContext } from './InfiniteScrollPosts'
import PostImagesCarousel from './images/PostImages'

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
    <div className={`w-full ${styles.post}`}>
      <PostHeader post={publicationCtx} isOwner={isOwner} />

      <article className="text-medium-gray text-lg font-light leading-8 mb-3 whitespace-pre-wrap">
        {publicationCtx?.content}
      </article>

      {publicationCtx.images && publicationCtx.images.length > 0 ? (
        <PostImagesCarousel imagesSrc={publicationCtx.images} />
      ) : undefined}

      {/* Likes */}
      <div id="reacts" className="w-[100%] h-[48px] gap-4 flex flex-row">
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
