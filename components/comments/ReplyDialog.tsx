'use client'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'
import NewCommentDialog from './NewCommentDialog'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  currentUserId?: string
  repliedCommentId: number
  fromPost: string
}

export default function ReplyDialog({
  isOpen,
  onClose,
  currentUserId,
  repliedCommentId,
  fromPost,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()

  if (isOpen) {
    router.push(pathname + '?reply=true')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        <ModalCloseButton />

        <ModalBody height={'100%'}>
          <NewCommentDialog
            currentUserId={currentUserId}
            target={{ id: repliedCommentId, type: 'parentCommentId' }}
            handleFacadeCommentSubmit={(_id: number) => console.log(_id)}
            fromPost={fromPost}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
