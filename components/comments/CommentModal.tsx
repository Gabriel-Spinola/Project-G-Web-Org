'use client'

import React, { createContext, useState } from 'react'
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
import NewCommentDialog from '../comments/NewCommentDialog'
import Comment from '../comments/Comment'

interface Props {
  commentNumber: number
  post: FullPost
  currentUserId?: string
}

export const CommentContext = createContext<{
  handleFacadeCommentSubmit?: (commentData: Partial<TDisplayComment>) => void
  handleFacadeCommentDeletion?: (id: number) => void
}>({
  handleFacadeCommentDeletion: undefined,
  handleFacadeCommentSubmit: undefined,
})

export default function CommentModal({ commentNumber, post }: Props) {
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
              <section>
                <div id="display">
                  {comments.length > 0 &&
                    comments.map((comment, index) => (
                      <Comment
                        key={index}
                        comment={comment}
                        fromPost={post.id}
                      />
                    ))}
                </div>
              </section>
            </ModalBody>

            <ModalFooter shadow={'dark-lg'}>
              <div id="form-container" className="w-full">
                <NewCommentDialog
                  target={{ id: post.id, type: 'postId' }}
                  fromPost={post.id}
                />
              </div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CommentContext.Provider>
    </div>
  )
}
