'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { handlePostDeletion } from '@/app/(feed)/_actions'
import { FaTrash } from 'react-icons/fa'

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
      className="flex gap-4 items-center"
    >
      <FaTrash size={20} />
      Deletar Post
    </button>
  )
}
