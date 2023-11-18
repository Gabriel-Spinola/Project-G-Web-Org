'use client'

import { PublicationAuthor, TDisplayComment } from '@/lib/types/common'
import React, { useContext, useState } from 'react'
import { LikeButton } from '../Buttons/LikeButton'
import { Like } from '@prisma/client'
import { Avatar, Button } from '@chakra-ui/react'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import Link from 'next/link'
import CommentReply from './CommentReply'
import { signIn, useSession } from 'next-auth/react'
import NewCommentDialog from './NewCommentDialog'
import { deleteComment } from '@/app/(feed)/_serverActions'
import { CommentContext } from './CommentModal'
import { BiComment, BiSolidComment } from 'react-icons/bi'

type Props = {
  comment: Partial<TDisplayComment>
}

export default function Comment({ comment }: Props) {
  const { data: session } = useSession()
  const [openReplies, setOpenReplies] = useState<boolean>(false)

  async function handleComment() {
    if (!session?.user.id) {
      signIn()
    } else {
      setOpenReplies(!openReplies)
    }
  }

  const context = useContext(CommentContext)
  const isLiked =
    comment.likes?.some(
      (like: Partial<Like>) => like.userId === session?.user.id,
    ) ?? false

  return (
    <div className="flex flex-col start">
      <section className="w-full flex flex-col bg-darker-white rounded-lg my-2 items-start justify-center p-2">
        <Button
          className="w-full"
          type="button"
          onClick={async () => {
            if (context.handleFacadeCommentDeletion) {
              context.handleFacadeCommentDeletion(comment.id as number)
            }

            await deleteComment(comment.id as number)
          }}
        >
          Excluir Comentário
        </Button>
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
        <>
          <div className="w-full">
            <NewCommentDialog
              target={{
                id: comment.id as number,
                type: 'parentCommentId',
              }}
            />
          </div>
          <section className="w-[95%] p-2 mb-4 rounded-md">
            <div id="replies">
              {comment.replies?.map((reply) => (
                <CommentReply key={reply.id} comment={reply} />
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  )
}
