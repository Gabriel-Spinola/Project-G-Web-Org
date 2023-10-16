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
import PostComment from '../comments/PostComment'
import { FullPost } from '@/lib/types/common'

export default function FullPostModal({ post }: { post: FullPost }) {
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
            <PostCommentsSection post={post} />
            <PostComment />
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
