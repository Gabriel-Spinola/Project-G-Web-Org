'use client'

import React from 'react'
import { User } from '@prisma/client'
import { FullPost } from '@/lib/types/common'
import PostSettings from './PostSettings'
import Link from 'next/link'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import Avatar from '../Avatar'

interface Props {
  post: FullPost
  isOwner: boolean
}

export default function PostHeader({ post, isOwner }: Props) {
  return (
    <section className="flex flex-row justify-between mb-4">
      <div id="Author" className="flex gap-2">
        <Link href={`/profile/${post.authorId}`}>
          <Avatar size="lg" imageUrl={getProfilePicURL(post.author as User)} />
        </Link>

        <Link href={`/profile/${post.authorId}`}>
          <div className="flex flex-col">
            <h1 className="text-light-primary font-normal text-xl lg:text-2xl hover:underline max-w-full hover:text-darker-primary">
              {post.author?.name ?? ''}
            </h1>
            <small className=" text-base">placeholder for something</small>
          </div>
        </Link>
      </div>

      <PostSettings publication={post} isOwner={isOwner} />
    </section>
  )
}
