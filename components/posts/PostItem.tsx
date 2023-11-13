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
import { useSession } from 'next-auth/react'
import NewCommentDialog from '../comments/NewCommentDialog'
import { PublicationContext } from './InfiniteScrollPosts'

export default function PostItem() {
  const { data: session } = useSession()

  const post = useContext(PublicationContext)

  if (!post) {
    return <></>
  }

  const isOwner = session?.user.id === post.authorId

  // Check if the current user liked the post
  const isLiked: boolean = post.likes.some(
    (like: Partial<Like>) => like.userId === session?.user.id,
  )

  return (
    <div className={styles.post}>
      <PostHeader post={post} isOwner={isOwner} />

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
            isLiked,
          }}
        />

        {/* Comments */}
        <CommentModal
          commentNumber={post.comments?.length ?? 0}
          post={post}
          newCommentDialog={
            <div id="form-container" className="w-full">
              <NewCommentDialog target={{ id: post.id, type: 'postId' }} />
            </div>
          }
        />
      </div>
    </div>
  )
}
