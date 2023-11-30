'use client'

import React from 'react'
import { BsFillSendFill } from 'react-icons/bs'

export default function CreateCommentButton({
  isLoading,
}: {
  isLoading: boolean
}) {
  return (
    <button
      type="submit"
      className="bg-medium-primary flex gap-2 justify-center items-center text-medium-white px-4 py-2 rounded-md hover:brightness-75"
      disabled={isLoading}
    >
      {isLoading ? 'Enviando... ' : 'Comentar'}
      <BsFillSendFill />
    </button>
  )
}
