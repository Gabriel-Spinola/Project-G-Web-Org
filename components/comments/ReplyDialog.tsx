'use client'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  currentUserId?: string
}

export default function ReplyDialog({ isOpen, onClose, currentUserId }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
      <ModalContent>
        <ModalCloseButton />

        <ModalBody height={'100%'}>
          <form></form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
