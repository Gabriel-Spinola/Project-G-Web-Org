'use client'

import React from 'react'
import { validateForm } from '@/lib/schemas/comment.schema'
import { postComment } from '@/app/(feed)/_serverActions'
import { signIn } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { TDisplayComment } from '@/lib/types/common'
import CreateCommentButton from '../Buttons/CreateCommentButton'

type Props = {
  currentUserId?: string
  target: {
    id: string | number
    type: 'postId' | 'parentCommentId'
  }
  fromPost: string
  handleFacadeCommentSubmit: (commentData: Partial<TDisplayComment>) => void
}

export default function NewCommentDialog({
  currentUserId,
  target,
  fromPost,
  handleFacadeCommentSubmit,
}: Props) {
  const router = useRouter()
  const pathName = usePathname()

  async function handleFormSubmission(formData: FormData) {
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

    handleFacadeCommentSubmit(data)

    router.replace(`${pathName}?update-comment=${fromPost}`, { scroll: false })
  }

  function inputReplace() {
    const formInput = document.getElementById('contentk') as HTMLInputElement
    const editableDiv = document.getElementById('editablediv') as HTMLDivElement

    formInput.value = editableDiv.innerHTML
  }

  function removePlaceHolder() {
    const placeHolder = document.getElementById(
      'commentPlaceHolder',
    ) as HTMLSpanElement

    placeHolder.innerHTML = ''
  }

  return (
    <form
      action={handleFormSubmission}
      className="flex flex-col justify-end items-end gap-4"
    >
      <input type="hidden" id="contentk" name="content" value="" />
      <div
        className="bg-darker-white w-full p-2 rounded-md outline-black/25"
        contentEditable
        id="editablediv"
        onInput={inputReplace}
        onClick={removePlaceHolder}
      ></div>

      <CreateCommentButton />
    </form>
  )
}
