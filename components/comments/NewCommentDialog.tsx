'use client'

import React, { useContext } from 'react'
import { validateForm } from '@/lib/schemas/comment.schema'
import { postComment } from '@/app/(feed)/_serverActions'
import { signIn, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import CreateCommentButton from '../Buttons/CreateCommentButton'
import { CommentContext } from './CommentModal'

type Props = {
  target: {
    id: string | number
    type: 'postId' | 'parentCommentId'
  }
  fromPost: string
}

export default function NewCommentDialog({ target, fromPost }: Props) {
  const { data: session } = useSession()

  const context = useContext(CommentContext)
  const router = useRouter()
  const pathName = usePathname()

  async function handleFormSubmission(formData: FormData) {
    if (!session?.user.id) {
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
      session?.user.id,
    )

    if (error || !data) {
      alert('failed to create comment')

      return
    }

    if (context.handleFacadeCommentSubmit) {
      context.handleFacadeCommentSubmit(data)
    }

    router.replace(`${pathName}?update-comment=${fromPost}`, { scroll: false })
  }

  function inputReplace() {
    const formInput = document.getElementById('contentk') as HTMLInputElement
    const editableDiv = document.getElementById('editablediv') as HTMLDivElement

    formInput.value = editableDiv.innerText
  }

  return (
    <form
      action={handleFormSubmission}
      className="flex justify-end items-end gap-4"
    >
      <input type="hidden" id="contentk" name="content" value="" />
      <div
        className="bg-darker-white w-[75%] p-2 rounded-t-md outline-black/25 border-b-2 border-medium-primary"
        contentEditable
        id="editablediv"
        onInput={inputReplace}
      ></div>
      <CreateCommentButton />
    </form>
  )
}
