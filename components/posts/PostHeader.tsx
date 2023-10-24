import React from 'react'
import { $Enums } from '@prisma/client'
import { FullPost } from '@/lib/types/common'
import UserPhoto from '@/components/profile/Avatar'
import PostSettings from './PostSettings'

interface Props {
  post: FullPost
  currentUserPosition?: $Enums.Positions
  isOwner: boolean
}

export default function PostHeader({
  post,
  currentUserPosition,
  isOwner,
}: Props) {
  return (
    <section className="flex flex-row justify-between mb-4">
      <div id="Author" className="flex gap-2">
        <a href={`/client/profile/${post.authorId}`}>
          <UserPhoto
            size={'lg'}
            src={post.author?.profilePic ? post.author?.profilePic : ''}
          />
        </a>

        <a className="flex flex-col" href={`/client/profile/${post.authorId}`}>
          <h1
            className={`text-light-primary font-normal text-2xl hover:underline hover:text-darker-primary`}
          >
            {post.author?.name ?? '):'}
          </h1>
          <small className=" text-base">{post.author?.location}</small>
        </a>
      </div>

      <PostSettings
        postId={post.id}
        isOwner={isOwner}
        currentUserPosition={currentUserPosition}
      />
    </section>
  )
}