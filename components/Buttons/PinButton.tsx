'use client'

import { pinPublication, unpinPublication } from '@/app/(feed)/_serverActions'
import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { MdOutlinePushPin, MdPushPin } from 'react-icons/md'
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
      className={`like flex flex-col hover:text-medium-primary justify-center items-center w-[48px] ${
        isPinned ? 'text-medium-primary' : 'text-light-gray'
      }`}
    >
      {!isPinned ? <MdOutlinePushPin size={28} /> : <MdPushPin size={28} />}
    </button>
  )
}
