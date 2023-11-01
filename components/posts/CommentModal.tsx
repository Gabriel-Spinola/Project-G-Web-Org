import React from 'react'
import { BiComment } from 'react-icons/bi'
import { FullPost } from '@/lib/types/common'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import PostCommentsSection from './PostCommentsSection'
import PostComment from '../comments/PostComment'

interface Props {
  commentNumber: number
  post: FullPost
  currentUserId?: string
}

export default function CommentModal({
  commentNumber,
  post,
  currentUserId,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <button
      className="flex flex-col justify-center items-center hover:text-medium-primary"
      onClick={onOpen}
    >
      <BiComment size={24} />
      <span>{commentNumber}</span>
      <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comentários</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PostCommentsSection post={post} currentUserId={currentUserId} />
            <PostComment />
          </ModalBody>
        </ModalContent>
      </Modal>
    </button>
  )
}
