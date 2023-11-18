'use client'

import React, { useContext } from 'react'
import { validateForm } from '@/lib/schemas/comment.schema'
import { postComment } from '@/app/(feed)/_serverActions'
import { signIn, useSession } from 'next-auth/react'
import CreateCommentButton from '../Buttons/CreateCommentButton'
import { CommentContext } from './CommentModal'
import { PublicationContext } from '../posts/InfiniteScrollPosts'

type Props = {
  target: {
    id: string | number
    type: 'postId' | 'parentCommentId'
  }
}

export default function NewCommentDialog({ target }: Props) {
  const { data: session } = useSession()

  const context = useContext(CommentContext)
  const post = useContext(PublicationContext)

  async function handleFormSubmission(formData: FormData) {
    if (!session?.user.id) {
      signIn()

      return
    }

    const a = new FormData()
    a.append('content', formData.get(`content-${target.id}`)?.toString() ?? '')

    const validatedData = validateForm(a)

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
      post?.id as string,
      session?.user.id,
    )

    if (error || !data) {
      alert('failed to create comment')

      return
    }

    if (context.handleFacadeCommentSubmit) {
      context.handleFacadeCommentSubmit(data)
    }
  }

  function inputReplace() {
    const formInput = document.getElementById(
      `content-${target.id}`,
    ) as HTMLInputElement
    const editableDiv = document.getElementById(
      `editable-container-${target.id}`,
    ) as HTMLDivElement

    formInput.value = editableDiv.innerText
  }

  return (
    <form
      action={handleFormSubmission}
      className="flex justify-end items-end gap-4"
    >
      <input
        type="hidden"
        id={`content-${target.id}`}
        name={`content-${target.id}`}
      />

      <div
        className="bg-darker-white w-full p-2 rounded-t-md outline-black/25 border-b-2 border-medium-primary"
        contentEditable
        id={`editable-container-${target.id}`}
        onInput={inputReplace}
      ></div>

      <CreateCommentButton />
    </form>
  )
}
