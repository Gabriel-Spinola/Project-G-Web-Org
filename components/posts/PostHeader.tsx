import React from 'react'
import { $Enums } from '@prisma/client'
import { FullPost } from '@/lib/types/common'
import { Avatar } from '@chakra-ui/avatar'
import PostSettings from './PostSettings'
import Link from 'next/link'
import { getProfilePicImageUrl } from '@/lib/storage/supabase'

interface Props {
  post: FullPost
  currentUserPosition?: $Enums.Positions
  isOwner: boolean
}

function getProfilePicURL(post: FullPost): string {
  const profilePicture = post.author?.profilePic as string

  if (profilePicture !== null || profilePicture !== undefined) {
    return getProfilePicImageUrl(profilePicture)
  }

  return ''
}

export default function PostHeader({
  post,
  currentUserPosition,
  isOwner,
}: Props) {
  return (
    <section className="flex flex-row justify-between mb-4">
      <div id="Author" className="flex gap-2">
        <Link href={`/profile/${post.authorId}`}>
          <div>
            <Avatar size={'lg'} src={getProfilePicURL(post)} />
          </div>
        </Link>

        <Link href={`/profile/${post.authorId}`}>
          <div className="flex flex-col">
            <h1 className="text-light-primary font-normal text-2xl hover:underline hover:text-darker-primary">
              {post.author?.name ?? ''}
            </h1>
            <small className=" text-base">{post.author?.location}</small>
          </div>
        </Link>
      </div>
      <PostSettings
        post={post}
        isOwner={isOwner}
        currentUserPosition={currentUserPosition}
      />
    </section>
  )
}
