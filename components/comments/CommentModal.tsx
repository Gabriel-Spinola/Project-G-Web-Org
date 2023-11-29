'use client'

import React, { ReactNode, createContext, useState } from 'react'
import { BiComment } from 'react-icons/bi'
import { FullPost, FullProject, TDisplayComment } from '@/lib/types/common'
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
import NewCommentDialog from './NewCommentDialog'

export const CommentCallbacks = createContext<
  | {
      onFacadeCommentSubmit: (commentData: Partial<TDisplayComment>) => void
      onFacadeCommentDeletion: (id: number) => void
      onAddCommentsCount: () => void
      onSubtractCommentsCount: () => void
    }
  | undefined
>(undefined)

export const CommentIdContext = createContext<number | undefined>(undefined)

interface Props {
  commentNumber: number
  publication: FullPost | FullProject
  targetType: 'projectId' | 'postId'
  icon?: ReactNode
}

export default function CommentModal({
  commentNumber,
  publication,
  targetType,
  icon,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [comments, setComments] = useState<Partial<TDisplayComment>[]>(
    publication.comments,
  )
  const [commentsCount, setCommentsCount] = useState(commentNumber)

  const onAddCommentsCount = () => setCommentsCount((prev) => prev + 1)
  const onSubtractCommentsCount = () => setCommentsCount((prev) => prev - 1)

  function onFacadeCommentSubmit(commentData: Partial<TDisplayComment>) {
    onAddCommentsCount()
    setComments((prev) => {
      return [...prev, commentData]
    })
  }

  function onFacadeCommentDeletion(id: number) {
    onSubtractCommentsCount()
    setComments((prev) => prev?.filter((prevComment) => prevComment.id !== id))
  }

  return (
    <div>
      <CommentCallbacks.Provider
        value={{
          onFacadeCommentDeletion,
          onFacadeCommentSubmit,
          onAddCommentsCount,
          onSubtractCommentsCount,
        }}
      >
        <button
          className="flex flex-col justify-center items-center hover:text-medium-primary"
          onClick={onOpen}
        >
          {icon ?? <BiComment size={24} />}

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

            <ModalFooter shadow={'dark-lg'}>
              <div id="form-container" className="w-full">
                <NewCommentDialog
                  target={{ id: publication.id, type: targetType }}
                  thisId={publication.id}
                  onSubmit={onFacadeCommentSubmit}
                />
              </div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CommentCallbacks.Provider>
    </div>
  )
}
