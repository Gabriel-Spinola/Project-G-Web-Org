'use client'

import { postComment } from '@/app/(feed)/_serverActions'
import { deleteComment } from '@/app/client/temp/comments/actions'
import { FullPost } from '@/lib/types/common'
import CreateCommentButton from '@/app/client/temp/components/CreateCommentButton'
import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type DisplayComment = {
  id: number
  content: string
}

// while the data is still being processes
export default function PostCommentsSection({ post }: { post: FullPost }) {
  const [comments, setComments] = useState<DisplayComment[]>(post.comments)

  const router = useRouter()
  const pathName = usePathname()

  function handleFacadeCommentSubmit(id: number, content: string) {
    setComments((prev) => [
      ...prev,
      {
        id,
        content,
      },
    ])
  }

  function handleFacadeCommentDeletion(id: number) {
    setComments((prev) => prev?.filter((prevComment) => prevComment.id !== id))
    router.replace(`${pathName}?update-comment=${id}`)
  }

  return (
    <div>
      <form
        action={async (formData) => {
          const { data, error } = await postComment(formData)

          if (error || !data) {
            alert('failed to create comment')

            return
          }

          handleFacadeCommentSubmit(data, formData.get('content') as string)
          router.replace(`${pathName}?update-comment=${data}`)
        }}
      >
        <input type="hidden" name="author-id" value={post.authorId as string} />
        <input type="hidden" name="target-id" value={post.id} />

        <label htmlFor="content"></label>
        <textarea
          name="content"
          title="content"
          id="contentk"
          cols={30}
          rows={3}
          placeholder="Faça seu comentário"
        ></textarea>

        <CreateCommentButton />
      </form>

      <hr />

      <h2>Comments</h2>

      {comments.length > 0 &&
        comments.map((comment, index) => (
          <div key={index}>
            <button
              type="button"
              onClick={async () => {
                handleFacadeCommentDeletion(comment.id)
                await deleteComment(comment.id)
              }}
            >
              delete
            </button>
            <span>{post.author?.name}</span>

            <label htmlFor="content"></label>
            <textarea
              title="content"
              id="content"
              cols={30}
              rows={2}
              value={comment.content}
              readOnly
            ></textarea>
          </div>
        ))}
    </div>
  )
}
