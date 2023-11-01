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

type Props = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  currentUserId?: string
  postId: string
}

export default function ReplyDialog({
  isOpen,
  onClose,
  currentUserId,
  postId,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        <ModalCloseButton />

        <ModalBody height={'100%'}>
          <NewCommentDialog
            currentUserId={currentUserId}
            postId={postId}
            handleFacadeCommentSubmit={(_id: number) => console.log(_id)}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
