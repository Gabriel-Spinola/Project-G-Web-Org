'use client'

import { postComment } from '@/app/(feed)/_serverActions'
import { FullPost, TDisplayComment } from '@/lib/types/common'
import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { validateForm } from '@/lib/schemas/comment.schema'
import { signIn } from 'next-auth/react'
import CreateCommentButton from '../Buttons/CreateCommentButton'
import Comment from '../comments/Comment'
import NewCommentDialog from '../comments/NewCommentDialog'

// REVIEW - this code is a complete shitty mess
export default function PostCommentsSection({
  post,
  currentUserId,
}: {
  post: FullPost
  currentUserId?: string
}) {
  const router = useRouter()
  const pathName = usePathname()

  const [comments, setComments] = useState<Partial<TDisplayComment>[]>(
    post.comments,
  )

  function handleFacadeCommentSubmit(
    id: number,
    content: string,
    authorName: string,
  ) {
    setComments((prev) => [
      ...prev,
      {
        id,
        content,
        author: {
          name: authorName,
        },
      },
    ])
  }

  function handleFacadeCommentDeletion(id: number) {
    setComments((prev) => prev?.filter((prevComment) => prevComment.id !== id))
    router.replace(`${pathName}?update-comment=${id}`)
  }

  return (
    <section>
      <div id="form-container">
        <NewCommentDialog
          currentUserId={currentUserId}
          postId={post.id}
          handleFacadeCommentSubmit={handleFacadeCommentSubmit}
        />
      </div>

      <hr />

      <div id="display">
        <h2>Comments</h2>

        {comments.length > 0 &&
          comments.map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              currentUserId={currentUserId}
              handleFacadeCommentDeletion={handleFacadeCommentDeletion}
            />
          ))}
      </div>
    </section>
  )
}
