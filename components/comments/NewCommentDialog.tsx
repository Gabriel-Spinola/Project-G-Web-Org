'use client'

import React from 'react'
import CreateCommentButton from '../Buttons/CreateCommentButton'
import { validateForm } from '@/lib/schemas/comment.schema'
import { postComment } from '@/app/(feed)/_serverActions'
import { signIn } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  currentUserId?: string
  postId: string
  handleFacadeCommentSubmit: (
    id: number,
    content: string,
    authorName: string,
  ) => void
}

export default function NewCommentDialog({
  currentUserId,
  postId,
  handleFacadeCommentSubmit,
}: Props) {
  const router = useRouter()
  const pathName = usePathname()

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

    handleFacadeCommentSubmit(
      data,
      formData.get('content') as string,
      currentUserId,
    )

    router.replace(`${pathName}?update-comment=${data}`)
  }

  return (
    <form action={handleFormSubimission}>
      <input type="hidden" name="author-id" value={currentUserId} />
      <input type="hidden" name="target-id" value={postId} />

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
  )
}
