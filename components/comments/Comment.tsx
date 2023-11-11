'use client'

import { PublicationAuthor, TDisplayComment } from '@/lib/types/common'
import React, { ReactNode } from 'react'
import { LikeButton } from '../Buttons/LikeButton'
import { Like } from '@prisma/client'
import { Avatar } from '@chakra-ui/react'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import Link from 'next/link'
import CommentReply from './CommentReply'
import { useSession } from 'next-auth/react'
import NewCommentDialog from './NewCommentDialog'

type Props = {
  settings: ReactNode
  comment: Partial<TDisplayComment>
}

export default function Comment({ comment, settings }: Props) {
  const { data: session } = useSession()

  const isOwner = session?.user.id === comment.authorId
  const isLiked =
    comment.likes?.some(
      (like: Partial<Like>) => like.userId === session?.user.id,
    ) ?? false

  return (
    <div className="flex flex-col items-end">
      <section className="w-full flex flex-col bg-darker-white rounded-lg my-2 items-start justify-center p-2">
        <div className="flex w-full">
          <Link
            href={`/profile/${comment.authorId}`}
            className="capitalize px-2 font-semibold"
          >
            <Avatar
              size={'lg'}
              src={getProfilePicURL(comment.author as PublicationAuthor)}
            />
          </Link>
          <div className="flex flex-col w-full">
            <Link
              href={`/profile/${comment.authorId}`}
              className="capitalize px-2 font-semibold"
            >
              {comment.author?.name}
            </Link>

            <label htmlFor="content"></label>
            <article
              title="content"
              id="content"
              className="resize-none w-full bg-darker-white rounded-lg p-2 ml-2"
            >
              {comment.content}
            </article>
          </div>

          <div className="flex flex-col items-center justify-center">
            {isOwner ?? settings}

            <LikeButton
              params={{
                option: 'commentId',
                likes: comment.likes?.length ?? 0,
                targetId: comment.id as number,
                isLiked,
              }}
            />
          </div>
        </div>
      </section>

      <section className="w-[95%] p-2 mb-4 rounded-md">
        <div id="replies">
          {comment.replies?.map((reply, index) => (
            <CommentReply key={index} comment={reply} />
          ))}
        </div>

        <NewCommentDialog
          target={{
            id: comment.id as number,
            type: 'parentCommentId',
          }}
        />
      </section>
    </div>
  )
}
