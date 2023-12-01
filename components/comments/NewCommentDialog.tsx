'use client'

import React, { FormEvent, useContext, useState } from 'react'
import { validateForm } from '@/lib/schemas/comment.schema'
import { postComment } from '@/app/(feed)/_serverActions'
import { signIn, useSession } from 'next-auth/react'
import CreateCommentButton from '../Buttons/CreateCommentButton'
import { PublicationContext } from '../posts/InfiniteScrollPosts'
import { TDisplayComment } from '@/lib/types/common'
import { toast } from 'react-toastify'

type Props = {
  target: {
    id: string | number
    type: 'postId' | 'parentCommentId' | 'projectId'
  }
  thisId: number | string
  onSubmit?: (data: Partial<TDisplayComment>) => void
  defaultValue?: string
}

export default function NewCommentDialog({
  thisId,
  target,
  defaultValue,
  onSubmit,
}: Props) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  async function handleFormSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    setIsLoading(true)

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

      toast.warn('Algo no fomulário é invalido no campo: ' + errorMessage)
      setIsLoading(false)

      return
    }

    const { data, error } = await toast.promise(
      postComment(
        convertedData.get('content')?.toString(),
        target,
        session.user.id,
      ),
      {
        pending: 'Enviando seu comentario...',
        success: 'Enviado 👌',
      },
    )

    setIsLoading(false)

    if (error || !data) {
      toast.error('Houve algum erro ao enviar seu comentário 😔')

      return
    }

    if (onSubmit) {
      onSubmit(data)
      ;(
        document.getElementById(
          `editable-container-${thisId}`,
        ) as HTMLDivElement
      ).innerText = ''
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
      onSubmit={handleFormSubmission}
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
        suppressContentEditableWarning={true}
        autoFocus={true}
      >
        <span className="mention">
          {defaultValue ? `@${defaultValue} ` : null}
        </span>
      </div>

      <CreateCommentButton isLoading={isLoading} />
    </form>
  )
}
