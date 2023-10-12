'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { handlePostDeletion } from '@/app/(feed)/_actions'

export default function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter()

  // TODO - Ask for confirmation before deleting the post
  return (
    <button
      onClick={async () => {
        await handlePostDeletion(router, postId)
      }}
    >
      Delete Post
    </button>
  )
}
