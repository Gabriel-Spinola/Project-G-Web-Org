'use client'

import React, { useContext, useState } from 'react'
import { validateForm } from '@/lib/schemas/comment.schema'
import { postComment } from '@/app/(feed)/_serverActions'
import { signIn, useSession } from 'next-auth/react'
import CreateCommentButton from '../Buttons/CreateCommentButton'
import { CommentContext } from './CommentModal'
import { PublicationContext } from '../posts/InfiniteScrollPosts'

type Props = {
  thisId: number | string
  target: {
    id: string | number
    type: 'postId' | 'parentCommentId'
  }
}

export default function NewCommentDialog({ thisId, target }: Props) {
  const { data: session } = useSession()

  const context = useContext(CommentContext)
  const post = useContext(PublicationContext)

  const [isLoading, setIsLoading] = useState(false)

  async function handleFormSubmission(formData: FormData) {
    if (!session?.user.id) {
      signIn()

      return
    }

    if (isLoading) {
      return
    }

    const convertedData = new FormData()
    convertedData.append(
      'content',
      formData.get(`content-${thisId}`)?.toString() ?? '',
    )

    const validatedData = validateForm(convertedData)

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
      convertedData.get('content')?.toString(),
      target,
      post?.id as string,
      session?.user.id,
    )

    setIsLoading(false)

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
      `content-${thisId}`,
    ) as HTMLInputElement
    const editableDiv = document.getElementById(
      `editable-container-${thisId}`,
    ) as HTMLDivElement

    formInput.value = editableDiv.innerText
  }

  return (
    <form
      action={handleFormSubmission}
      onSubmit={() => setIsLoading(true)}
      className="flex justify-end items-end gap-4"
    >
      <input
        type="hidden"
        id={`content-${thisId}`}
        name={`content-${thisId}`}
      />

      <div
        className="bg-darker-white w-full p-2 rounded-t-md outline-black/25 border-b-2 border-medium-primary"
        contentEditable
        id={`editable-container-${thisId}`}
        onInput={inputReplace}
      ></div>

      <CreateCommentButton isLoading={isLoading} />
    </form>
  )
}
