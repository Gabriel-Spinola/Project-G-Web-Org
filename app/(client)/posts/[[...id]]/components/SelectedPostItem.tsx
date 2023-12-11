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
import { LikeButton } from '@/components/Buttons/LikeButton'
import { Like, Pin } from '@prisma/client'
import PostHeader from '@/components/posts/PostHeader'
import { PublicationContext } from '@/components/posts/InfiniteScrollPosts'
import dynamic from 'next/dynamic'
import PinButton from '@/components/Buttons/PinButton'
import Loader from '@/components/Loader'
import { BiComment } from 'react-icons/bi'

const DynamicCommentModal = dynamic(
  () => import('@/components/comments/CommentModal'),
  {
    ssr: false,
    loading: () => <BiComment className="mt-[2px]" size={23} />,
  },
)

const DynamicImagesCorousel = dynamic(
  () => import('@/components/posts/images/PostImages'),
  {
    ssr: false,
    loading: () => <Loader />,
  },
)

export default function SelectedPostItem() {
  const publicationCtx = useContext(PublicationContext)

  if (!publicationCtx) {
    return (
      <section>
        <p>Este post não foi achado</p>
        <></>
      </section>
    )
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

      {publicationCtx.images && publicationCtx.images.length > 0 ? (
        <DynamicImagesCorousel imagesSrc={publicationCtx.images} />
      ) : undefined}

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
