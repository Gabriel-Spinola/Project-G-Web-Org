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
import { LikeButton } from '@/components/Buttons/LikeButton'
import PostHeader from '@/components/posts/PostHeader'
import dynamic from 'next/dynamic'
import PinButton from '@/components/Buttons/PinButton'
import Loader from '@/components/Loader'
import { BiComment } from 'react-icons/bi'
import { PostType } from '@/lib/types/common'

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

type Props = {
  post: PostType | null
  isOwner: boolean
  isLiked: boolean
  isPinned: boolean
}

export default function SelectedPostItem({
  post,
  isOwner,
  isLiked,
  isPinned,
}: Props) {
  if (!post) {
    return (
      <section>
        <p>Este post não foi encontrado!</p>
        <></>
      </section>
    )
  }

  function getCommentsCount(): number {
    if (!post?.comments) {
      return 0
    }

    let count = 0

    for (const comment of post.comments) {
      count += comment.replies?.length ?? 0
    }

    return post.comments.length + count
  }

  return (
    <div className={`w-full ${styles.post}`}>
      <PostHeader post={post} isOwner={isOwner} />

      <article className="text-medium-gray text-lg font-light leading-8 mb-3 whitespace-pre-wrap">
        {post?.content}
      </article>

      {post.images && post.images.length > 0 ? (
        <DynamicImagesCorousel imagesSrc={post.images} />
      ) : undefined}

      {/* Likes */}
      <div id="reacts" className="w-[100%] h-[48px] gap-4 flex flex-row mt-4">
        <LikeButton
          params={{
            option: 'postId',
            likes: post.likes?.length ?? 0,
            targetId: post.id,
            isLiked,
          }}
        />

        {/* Comments */}
        <DynamicCommentModal
          commentNumber={getCommentsCount()}
          publication={post}
          targetType="postId"
        />

        <PinButton
          isPinned={isPinned}
          targetId={post.id}
          option="postId"
          iconColor="light-gray"
        />
      </div>
    </div>
  )
}
