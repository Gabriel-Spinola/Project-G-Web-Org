'use client'

import { deleteComment, postComment } from '@/app/(feed)/_serverActions'
import { FullPost } from '@/lib/types/common'

import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { validateForm } from '@/lib/schemas/comment.schema'
import { signIn } from 'next-auth/react'
import { LikeButton } from '../Buttons/LikeButton'
import { Like } from '@prisma/client'
import CreateCommentButton from '../Buttons/CreateCommentButton'

type DisplayComment = {
  id: number
  content: string
}

// REVIEW - this code is a complete shitty mess
export default function PostCommentsSection({
  post,
  currentUserId,
}: {
  post: FullPost
  currentUserId?: string
}) {
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

  async function handleFormSubimission(formData: FormData) {
    if (!currentUserId) {
      signIn()

      return
    }

    const validatedData = validateForm(formData)

    if (validatedData.error) {
      let errorMessage = ''

      validatedData.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ': ' + issue.message + '. \n'
      })

      alert('Algo no fomulário é invalido no campo: ' + errorMessage)

      return
    }

    const { data, error } = await postComment(validatedData.data)

    if (error || !data) {
      alert('failed to create comment')

      return
    }

    handleFacadeCommentSubmit(data, formData.get('content') as string)
    router.replace(`${pathName}?update-comment=${data}`)
  }

  return (
    <div>
      <form action={handleFormSubimission}>
        <input type="hidden" name="author-id" value={currentUserId} />
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

            <LikeButton
              params={{
                option: 'commentId',
                likes: post.comments[index]?.likes?.length ?? 0,
                targetId: comment.id,
                authorId: currentUserId,
                isLiked:
                  post.comments[index]?.likes?.some(
                    (like: Partial<Like>) => like.userId === currentUserId,
                  ) ?? false,
              }}
            />
          </div>
        ))}
    </div>
  )
}
