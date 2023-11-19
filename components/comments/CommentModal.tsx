'use client'

import React, { ReactNode, createContext, useState } from 'react'
import { BiComment } from 'react-icons/bi'
import { FullPost, TDisplayComment } from '@/lib/types/common'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import Comment from '../comments/Comment'

export const CommentContext = createContext<{
  handleFacadeCommentSubmit?: (commentData: Partial<TDisplayComment>) => void
  handleFacadeCommentDeletion?: (id: number) => void
}>({})

export const CommentIdContext = createContext<number | undefined>(undefined)

interface Props {
  commentNumber: number
  post: FullPost
  newCommentDialog: ReactNode
}

export default function CommentModal({
  commentNumber,
  post,
  newCommentDialog,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [comments, setComments] = useState<Partial<TDisplayComment>[]>(
    post.comments,
  )
  const [commentsCount, setCommentsCount] = useState(commentNumber)

  function handleFacadeCommentSubmit(commentData: Partial<TDisplayComment>) {
    setCommentsCount((prev) => prev + 1)
    setComments((prev) => [...prev, commentData])
  }

  function handleFacadeCommentDeletion(id: number) {
    setComments((prev) => prev?.filter((prevComment) => prevComment.id !== id))
    setCommentsCount((prev) => prev - 1)
  }

  return (
    <div>
      <CommentContext.Provider
        value={{ handleFacadeCommentDeletion, handleFacadeCommentSubmit }}
      >
        <button
          className="flex flex-col justify-center items-center hover:text-medium-primary"
          onClick={onOpen}
        >
          <BiComment size={24} />

          <span>{commentsCount}</span>
        </button>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={'2xl'}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Comentários</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <div id="display">
                {comments.length > 0 &&
                  comments.map((comment) => (
                    <div key={comment.id}>
                      <CommentIdContext.Provider value={comment.id}>
                        {!comment.parentCommentId ? (
                          <Comment comment={comment} />
                        ) : null}
                      </CommentIdContext.Provider>
                    </div>
                  ))}
              </div>
            </ModalBody>

            <ModalFooter shadow={'dark-lg'}>{newCommentDialog}</ModalFooter>
          </ModalContent>
        </Modal>
      </CommentContext.Provider>
    </div>
  )
}
