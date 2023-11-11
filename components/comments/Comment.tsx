'use client'

import { PublicationAuthor, TDisplayComment } from '@/lib/types/common'
import React, { useContext } from 'react'
import { LikeButton } from '../Buttons/LikeButton'
import { Like } from '@prisma/client'
import { Avatar } from '@chakra-ui/react'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import Link from 'next/link'
import ReplyDialog from './ReplyDialog'
import CommentReply from './CommentReply'
import MenuSettings from './MenuSettings'
import { useSession } from 'next-auth/react'

type Props = {
  comment: Partial<TDisplayComment>
  fromPost: string
}

export default function Comment({ comment, fromPost }: Props) {
  const { data: session } = useSession()

  const isOwner = session?.user.id === comment.authorId

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
            {isOwner ? <MenuSettings comment={comment} /> : null}
            <LikeButton
              params={{
                option: 'commentId',
                likes: comment.likes?.length ?? 0,
                targetId: comment.id as number,
                authorId: session?.user.id,
                isLiked:
                  comment.likes?.some(
                    (like: Partial<Like>) => like.userId === session?.user.id,
                  ) ?? false,
              }}
            />
          </div>
        </div>
      </section>

      <section className="w-[95%] p-2 mb-4 rounded-md">
        <div id="replies">
          {comment.replies?.map((reply, index) => (
            <div key={index}>
              <CommentReply comment={reply} fromPost={fromPost} />
            </div>
          ))}
        </div>

        <ReplyDialog
          repliedCommentId={comment.id as number}
          fromPost={fromPost}
        />
      </section>
    </div>
  )
}
