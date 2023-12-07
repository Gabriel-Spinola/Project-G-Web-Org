/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

'use client'

import React, { Suspense, useContext } from 'react'
import styles from '@/components/posts/PostItem.module.scss'
import { LikeButton } from '../Buttons/LikeButton'
import { Like, Pin } from '@prisma/client'
import PostHeader from './PostHeader'
import { PublicationContext } from './InfiniteScrollPosts'
import dynamic from 'next/dynamic'
import PinButton from '../Buttons/PinButton'

const DynamicCommentModal = dynamic(() => import('../comments/CommentModal'), {
  ssr: false,
})

const DynamicImagesCorousel = dynamic(() => import('./images/PostImages'), {
  ssr: false,
  loading: () => <>DYNAMIC LOADING</>,
})

export default function PostItem() {
  const publicationCtx = useContext(PublicationContext)

  if (!publicationCtx) {
    return <></>
  }

  const isOwner = publicationCtx.session === publicationCtx.authorId

  const isLiked: boolean = publicationCtx?.likes.some(
    (like: Partial<Like>) => like.userId === publicationCtx.session,
  )

  const isPinned: boolean =
    publicationCtx?.pins?.some(
      (pin: Partial<Pin>) => pin.userId === publicationCtx.session,
    ) ?? false

  function getCommentsCount(): number {
    if (!publicationCtx?.comments) {
      return 0
    }

    let count = 0

    for (const comment of publicationCtx.comments) {
      count += comment.replies?.length ?? 0
    }

    return publicationCtx.comments.length + count
  }

  return (
    <div className={`w-full ${styles.post}`}>
      <PostHeader post={publicationCtx} isOwner={isOwner} />

      <article className="text-medium-gray text-lg font-light leading-8 mb-3 whitespace-pre-wrap">
        {publicationCtx?.content}
      </article>

      {/* TODO - Add image optimization */}
      <Suspense fallback={<>Carregando imagens</>}>
        {publicationCtx.images && publicationCtx.images.length > 0 ? (
          <DynamicImagesCorousel imagesSrc={publicationCtx.images} />
        ) : undefined}
      </Suspense>

      {/* Likes */}
      <div id="reacts" className="w-[100%] h-[48px] gap-4 flex flex-row mt-4">
        <LikeButton
          params={{
            option: 'postId',
            likes: publicationCtx.likes?.length ?? 0,
            targetId: publicationCtx.id,
            isLiked,
          }}
        />

        {/* Comments */}
        <DynamicCommentModal
          commentNumber={getCommentsCount()}
          publication={publicationCtx}
          targetType="postId"
        />

        <PinButton
          isPinned={isPinned}
          targetId={publicationCtx.id}
          option="postId"
          iconColor="light-gray"
        />
      </div>
    </div>
  )
}
