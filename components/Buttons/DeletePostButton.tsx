'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { handlePostDeletion } from '@/app/(feed)/_actions'
import { FaTrash } from 'react-icons/fa'

export default function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter()

  // TODO - Ask for confirmation before deleting the post
  return (
    <button
      onClick={async () => {
        await handlePostDeletion(router, postId)
      }}
      className="flex gap-4 items-center"
    >
      <FaTrash />
      Deletar Post
    </button>
  )
}
