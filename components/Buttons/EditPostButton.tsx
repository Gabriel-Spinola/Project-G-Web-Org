'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { FaEdit } from 'react-icons/fa'

export default function EditPostButton({ postId }: { postId: string }) {
  const router = useRouter()

  // TODO - CREATE fUNCIONALITY TO EDIT POST
  return (
    <button
      onClick={async () => {
        // await handlePostDeletion(router, postId)
      }}
      className="flex gap-4 items-center"
    >
      <FaEdit />
      Editar Post
    </button>
  )
}
