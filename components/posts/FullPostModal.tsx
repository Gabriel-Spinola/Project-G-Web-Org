'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import PostCommentsSection from './PostCommentsSection'
import { FullPost } from '@/lib/types/common'

export default function FullPostModal({
  post,
  currentUserId,
}: {
  post: FullPost
  currentUserId?: string
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Expand Post</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Faça uma publicação</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <PostCommentsSection post={post} currentUserId={currentUserId} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
