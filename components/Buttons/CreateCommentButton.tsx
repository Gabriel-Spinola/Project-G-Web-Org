'use client'

import React from 'react'

export default function CreateCommentButton() {
  // const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="bg-medium-primary text-medium-white px-4 py-2 rounded-md hover:brightness-75"
    >
      {'Comentar'}
    </button>
  )
}
