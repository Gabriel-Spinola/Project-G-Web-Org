'use client'

import { PublicationAuthor, PublicationComment } from '@/lib/types/common'
import React, { createContext, useContext, useState } from 'react'
import { LikeButton } from '../Buttons/LikeButton'
import { Like } from '@prisma/client'
import { Avatar, Button } from '@chakra-ui/react'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import Link from 'next/link'
import CommentReply from './CommentReply'
import { signIn, useSession } from 'next-auth/react'
import NewCommentDialog from './NewCommentDialog'
import { CommentCallbacks } from './CommentModal'
import { BiComment, BiSolidComment } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { deleteComment } from '@/server/likeActions'

type Props = {
  comment: Partial<PublicationComment>
}

type ReplyCallbacksType = {
  onReply: (data: Partial<PublicationComment>) => void
  onReplyDeletion: (id: number) => void
}

export const ReplyCallbacks = createContext<ReplyCallbacksType | undefined>(
  undefined,
)

export default function Comment({ comment }: Props) {
  const { data: session } = useSession()
  const [openReplies, setOpenReplies] = useState<boolean>(false)
  const context = useContext(CommentCallbacks)

  const [replies, setReplies] = useState<Partial<PublicationComment>[]>(
    comment.replies ?? [],
  )

  function handleFacadeReplySubmit(commentData: Partial<PublicationComment>) {
    context?.onAddCommentsCount()
    setReplies((prev) => [...prev, commentData])
  }

  function handleFacadeCommentDeletion(id: number) {
    context?.onSubtractCommentsCount()
    setReplies((prev) => prev?.filter((prevReply) => prevReply?.id !== id))
  }

  function openCommentReplies() {
    if (!session?.user.id) {
      signIn()

      return
    }

    setOpenReplies(!openReplies)
  }

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
                    context?.onFacadeCommentDeletion(comment.id as number)

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
            onClick={openCommentReplies}
            className={`like flex flex-col hover:text-medium-primary text-darker-gray justify-center items-center w-[48px] ${
              openReplies ? 'text-medium-primary' : 'text-darker-gray'
            }`}
          >
            {!openReplies ? (
              <BiComment size={24} />
            ) : (
              <BiSolidComment size={24} />
            )}

            <span>{replies?.length ?? 0}</span>
          </button>
        </section>
      </section>

      {openReplies ? (
        <ReplyCallbacks.Provider
          value={{
            onReply: handleFacadeReplySubmit,
            onReplyDeletion: handleFacadeCommentDeletion,
          }}
        >
          <div className="w-full">
            <NewCommentDialog
              thisId={comment.id as number}
              target={{
                id: comment.id as number,
                type: 'parentCommentId',
              }}
              onSubmit={handleFacadeReplySubmit}
            />
          </div>

          <section className="w-[95%] py-2 mb-4 rounded-md">
            <div id="replies">
              {replies.map((reply) => (
                <CommentReply key={reply.id} comment={reply} />
              ))}
            </div>
          </section>
        </ReplyCallbacks.Provider>
      ) : null}
    </div>
  )
}
