import React, { useState } from 'react'
import { BiComment } from 'react-icons/bi'
import { FullPost, TDisplayComment } from '@/lib/types/common'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
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

export default function CommentModal({
  commentNumber,
  post,
  currentUserId,
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
      <button
        className="flex flex-col justify-center items-center hover:text-medium-primary"
        onClick={onOpen}
      >
        <BiComment size={24} />

        <span>{commentsCount}</span>
      </button>

      <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comentários</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <section>
              <div id="form-container">
                <NewCommentDialog
                  currentUserId={currentUserId}
                  target={{ id: post.id, type: 'postId' }}
                  handleFacadeCommentSubmit={handleFacadeCommentSubmit}
                  fromPost={post.id}
                />
              </div>

              <hr />

              <div id="display">
                <h2>Comments</h2>

                {comments.length > 0 &&
                  comments.map((comment, index) => (
                    <Comment
                      key={index}
                      comment={comment}
                      currentUserId={currentUserId}
                      fromPost={post.id}
                      handleFacadeCommentDeletion={handleFacadeCommentDeletion}
                    />
                  ))}
              </div>
            </section>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
