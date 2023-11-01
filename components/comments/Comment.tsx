'use client'

import { TDisplayComment } from '@/lib/types/common'
import React from 'react'
import { deleteComment } from '@/app/(feed)/_serverActions'
import { LikeButton } from '../Buttons/LikeButton'
import { Like } from '@prisma/client'
import ReplyDialog from './ReplyDialog'
import { useDisclosure } from '@chakra-ui/react'

type Props = {
  comment: Partial<TDisplayComment>
  currentUserId?: string
  handleFacadeCommentDeletion?: (id: number) => void
}

export default function Comment({
  comment,
  currentUserId,
  handleFacadeCommentDeletion,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <button onClick={onOpen}>opendialogo</button>
      <ReplyDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        currentUserId={currentUserId}
      />

      <button
        type="button"
        onClick={async () => {
          if (handleFacadeCommentDeletion) {
            handleFacadeCommentDeletion(comment.id as number)
          }

          await deleteComment(comment.id as number)
        }}
      >
        delete
      </button>

      <span>{comment.author?.name}</span>

      <label htmlFor="content"></label>
      <textarea
        title="content"
        id="content"
        cols={30}
        rows={2}
        value={comment.content}
        readOnly
      ></textarea>

      <LikeButton
        params={{
          option: 'commentId',
          likes: comment.likes?.length ?? 0,
          targetId: comment.id as number,
          authorId: currentUserId,
          isLiked:
            comment.likes?.some(
              (like: Partial<Like>) => like.userId === currentUserId,
            ) ?? false,
        }}
      />

      <div id="replies">
        {comment.replies?.map((reply, index) => (
          <div key={index}>
            <h1>subComments</h1>

            <Comment
              comment={reply}
              currentUserId={currentUserId}
              handleFacadeCommentDeletion={handleFacadeCommentDeletion}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
