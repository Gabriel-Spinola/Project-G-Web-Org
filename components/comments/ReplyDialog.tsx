'use client'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import NewCommentDialog from './NewCommentDialog'
import { usePathname, useRouter } from 'next/navigation'
import { TDisplayComment } from '@/lib/types/common'

type Props = {
  currentUserId?: string
  repliedCommentId: number
  fromPost: string
  handleFacadeCommentSubmit: (commentData: Partial<TDisplayComment>) => void
}

export default function ReplyDialog({
  currentUserId,
  repliedCommentId,
  fromPost,
  handleFacadeCommentSubmit,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()
  const pathname = usePathname()

  if (isOpen) {
    router.push(pathname + '?reply=true')
  }

  return (
    <div>
      <NewCommentDialog
        currentUserId={currentUserId}
        target={{ id: repliedCommentId, type: 'parentCommentId' }}
        handleFacadeCommentSubmit={handleFacadeCommentSubmit}
        fromPost={fromPost}
      />
    </div>
  )
}
