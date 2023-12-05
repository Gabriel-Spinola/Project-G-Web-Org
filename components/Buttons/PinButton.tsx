'use client'

import { pinPublication, unpinPublication } from '@/server/pinActions'
import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { toast } from 'react-toastify'

type Params = {
  isPinned: boolean
  targetId: string
}

export default function PinButton({
  isPinned: alreadyPinned,
  targetId,
}: Params) {
  const { data: session } = useSession()

  const [isPinned, setIsPinned] = useState(alreadyPinned)

  async function handlePin() {
    if (!session?.user) {
      signIn()

      return
    }

    setIsPinned(!isPinned)

    if (!isPinned) {
      const { error } = await pinPublication(
        'postId',
        session.user.id,
        targetId,
      )

      if (error) {
        toast.error('Houve um erro ao favoritar a publicação')
      }
    } else {
      const { error } = await unpinPublication('postId', targetId)

      if (error) {
        toast.error('Houve um erro ao desfavoritar a publicação')
      }
    }
  }

  return (
    <button
      onClick={handlePin}
      className={`like flex items-center justify-center hover:text-medium-primary w-[48px] ${
        isPinned ? 'text-medium-primary' : 'text-light-gray'
      }`}
    >
      {!isPinned ? <BsBookmark size={24} /> : <BsBookmarkFill size={24} />}
    </button>
  )
}
