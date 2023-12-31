'use client'

import { PublicationAuthor, PublicationComment } from '@/lib/types/common'
import React, { useContext, useState } from 'react'
import { LikeButton } from '../Buttons/LikeButton'
import { Like } from '@prisma/client'
import { Avatar, Button } from '@chakra-ui/react'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import { deleteComment } from '@/server/likeActions'
import Link from 'next/link'

import { CommentIdContext } from './CommentModal'
import { signIn, useSession } from 'next-auth/react'
import NewCommentDialog from './NewCommentDialog'
import { FaTrash } from 'react-icons/fa'
import { BiComment, BiSolidComment } from 'react-icons/bi'
import { ReplyCallbacks } from './Comment'

type Props = {
  comment: Partial<PublicationComment>
}

export default function CommentReply({ comment }: Props) {
  const { data: session } = useSession()
  const firstCommentId = useContext(CommentIdContext)
  const replyCtx = useContext(ReplyCallbacks)
  const [openReplies, setOpenReplies] = useState<boolean>(false)

  async function handleComment() {
    if (!session?.user.id) {
      signIn()
    } else {
      setOpenReplies(!openReplies)
    }
  }

  const isLiked =
    comment.likes?.some(
      (like: Partial<Like>) => like.userId === session?.user.id,
    ) ?? false
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
              size={'md'}
              src={getProfilePicURL(comment.author as PublicationAuthor)}
            />
          </Link>
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full">
              <Link
                href={`/profile/${comment.authorId}`}
                className="capitalize px-2 font-semibold"
              >
                {comment.author?.name}
              </Link>
              {isOwner ? (
                <Button
                  variant={'ghost'}
                  type="button"
                  onClick={async () => {
                    replyCtx?.onReplyDeletion(comment.id as number)

                    await deleteComment(comment.id as number)
                  }}
                >
                  <FaTrash />
                </Button>
              ) : null}
            </div>

            <label htmlFor="content"></label>
            <article
              title="content"
              id="content"
              className="resize-none w-full bg-darker-white rounded-lg p-2 ml-2"
            >
              {comment.content}
            </article>
          </div>
        </div>

        <section className="flex flex-row items-center justify-center pt-4">
          <LikeButton
            params={{
              option: 'commentId',
              likes: comment.likes?.length ?? 0,
              targetId: comment.id as number,
              isLiked,
            }}
          />
          <button
            onClick={handleComment}
            className={`like flex flex-col hover:text-medium-primary text-darker-gray justify-center items-center w-[48px] ${
              openReplies ? 'text-medium-primary' : 'text-darker-gray'
            }`}
          >
            {!openReplies ? (
              <BiComment size={24} />
            ) : (
              <BiSolidComment size={24} />
            )}
            <span>{comment.replies?.length ?? 0}</span>
          </button>
        </section>
      </section>

      {openReplies ? (
        <div className="w-full">
          <NewCommentDialog
            target={{
              id: firstCommentId as number,
              type: 'parentCommentId',
            }}
            thisId={comment.id as number}
            defaultValue={comment.author?.name}
            onSubmit={replyCtx?.onReply}
          />
        </div>
      ) : null}
    </div>
  )
}
