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
import { LikeButton } from '@/app/client/temp/components/Buttons'
import { Like } from '@prisma/client'
import OneImageDisplay from './images/oneImageDisplay'
import TwoImageDisplay from './images/TwoImageDisplay'
import ThreeImageDisplay from './images/ThreeImageDisplay'
import FullPostModal from './FullPostModal'
import UserPhoto from '../profile/Avatar'
import PostSettings from './PostSettings'

interface Params {
  post: FullPost
  currentUserId?: string
}

export default function PostItem({ post, currentUserId }: Params) {
  const isOwner = currentUserId === post.authorId

  // Check if the current user liked the post
  const isLiked: boolean = post.likes.some(
    (like: Partial<Like>) => like.userId === currentUserId,
  )

  return (
    <div className={styles.post}>
      <section className={styles.authorContainer}>
        <div id="Author" className="flex">
          <a href={`/client/profile/${post.authorId}`}>
            <UserPhoto
              size={'lg'}
              src={post.author?.profilePic ? post.author?.profilePic : ''}
            />
          </a>

          <a
            className={styles.userInfo}
            href={`/client/profile/${post.authorId}`}
          >
            <h1
              className={`text-light-primary font-normal text-2xl hover:underline hover:text-darker-primary`}
            >
              {post.author?.name ?? '):'}
            </h1>
            <small className=" text-base">{post.author?.location}</small>
          </a>
        </div>

        <PostSettings postId={post.id} isOwner={isOwner} />
      </section>

      <article className={styles.p1}>{post?.content}</article>
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
      ) : (
        'ocorreu um erro'
      )}
      {/* Likes */}
      <div id="reacts" className="w-[100%] h-[48px] mt-4 flex flex-row">
        <LikeButton
          params={{
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

        <a href={`/client/posts/${post.id}`}>Check Post</a>
        <FullPostModal post={post} />
      </div>
    </div>
  )
}
