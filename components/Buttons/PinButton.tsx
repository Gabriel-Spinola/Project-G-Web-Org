'use client'

import { PinOptions } from '@/app/(feed)/_constants'
import { pinPublication, unpinPublication } from '@/server/pinActions'
import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { MdOutlinePushPin, MdPushPin } from 'react-icons/md'
import { toast } from 'react-toastify'

type Params = {
  isPinned: boolean
  option: PinOptions
  targetId: string
  iconColor: string
}

export default function PinButton({
  isPinned: alreadyPinned,
  option,
  targetId,
  iconColor,
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
      const { error } = await pinPublication(option, session.user.id, targetId)

      if (error) {
        setIsPinned(false)
        toast.error('Houve um erro ao favoritar a publicação')
      }
    } else {
      const { error } = await unpinPublication(option, targetId)

      if (error) {
        setIsPinned(true)
        toast.error('Houve um erro ao desfavoritar a publicação')
      }
    }
  }

  return (
    <button
      onClick={handlePin}
      className={`like flex flex-col hover:text-medium-primary justify-center items-center w-[48px] ${
        isPinned ? 'text-medium-primary' : `text-${iconColor}`
      }`}
    >
      {!isPinned ? <MdOutlinePushPin size={28} /> : <MdPushPin size={28} />}
    </button>
  )
}
