/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

import React from 'react'
import Image from 'next/image'
import styles from '@/components/posts/PostItem.module.scss'
import { FullPost } from '@/lib/types/common'
import { getPostImageUrl } from '@/lib/storage/supabase'
import { LikeButton } from '@/app/client/temp/components/Buttons'
import { Like } from '@prisma/client'
import FullPostModal from './FullPostModal'
import DeletePostButton from './DeletePostButton'

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
    <div className={styles.postado}>
      <a href={`/client/posts/${post.authorId}/${post.id}/`}>see post</a>

      {isOwner && <DeletePostButton postId={post.id} />}

      <div className={styles.autor}>
        <div className={styles.foto}>
          <div className="overflow-x-auto"></div>
        </div>

        <a
          className={styles.nomeLocalizacao}
          href={`/client/profile/${post.authorId}`}
        >
          <h1 className={styles.nome}>{post.author?.name ?? '):'}</h1>
          <small className={styles.localizacao}>{post.author?.location}</small>
        </a>
      </div>

      <article className={styles.p1}>{post?.content}</article>

      {/* TODO - Add more images to the container */}
      <div className="image-container">
        <Image
          className={styles.oneImg}
          src={
            post.images.length > 0
              ? getPostImageUrl(post.images[0])
              : '/test-img/imgtest.jpg'
          }
          alt={post.images.length > 0 ? post.images[0] : 'noimg'}
          width={776}
          height={1000}
          priority
        />
      </div>

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
        <FullPostModal />
      </div>
    </div>
  )
}
