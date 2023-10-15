'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { handlePostDeletion } from '@/app/(feed)/_actions'

export default function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter()
  const pathName = usePathname()

  // TODO - Ask for confirmation before deleting the post
  return (
    <button
      onClick={async () => {
        await handlePostDeletion(postId, () => {
          router.push(`${pathName}?delete=${postId}`, { scroll: false })
        })
      }}
    >
      Delete Post
    </button>
  )
}
