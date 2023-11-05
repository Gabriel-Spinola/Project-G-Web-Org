'use client'

import React from 'react'
import CreateCommentButton from '../Buttons/CreateCommentButton'
import { validateForm } from '@/lib/schemas/comment.schema'
import { postComment } from '@/app/(feed)/_serverActions'
import { signIn } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  currentUserId?: string
  target: {
    id: string | number
    type: 'postId' | 'parentCommentId'
  }
  fromPost: string
  handleFacadeCommentSubmit: (
    id: number,
    content: string,
    authorName: string,
  ) => void
}

export default function NewCommentDialog({
  currentUserId,
  target,
  fromPost,
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

    const { data, error } = await postComment(
      validatedData.data,
      target,
      fromPost,
      currentUserId,
    )

    if (error || !data) {
      alert('failed to create comment')

      return
    }

    handleFacadeCommentSubmit(
      data,
      formData.get('content') as string,
      currentUserId,
    )

    router.replace(`${pathName}?update-comment=${fromPost}`, { scroll: false })
  }

  return (
    <form action={handleFormSubimission}>
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
