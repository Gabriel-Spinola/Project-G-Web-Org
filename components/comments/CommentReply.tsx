'use client'

import { PublicationAuthor, TDisplayComment } from '@/lib/types/common'
import React, { useContext } from 'react'
import { LikeButton } from '../Buttons/LikeButton'
import { BsThreeDots } from 'react-icons/bs'
import { Like } from '@prisma/client'
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import { deleteComment } from '@/app/(feed)/_serverActions'
import Link from 'next/link'

import { CommentContext } from './CommentModal'
import { useSession } from 'next-auth/react'
import NewCommentDialog from './NewCommentDialog'

type Props = {
  comment: Partial<TDisplayComment>
}

export default function CommentReply({ comment }: Props) {
  const { data: session } = useSession()

  const parentComment = useContext(CommentContext)

  console.log(comment.replies?.length)

  const isLiked =
    comment.likes?.some(
      (like: Partial<Like>) => like.userId === session?.user.id,
    ) ?? false
  const isOwner = session?.user.id === comment.authorId

  return (
    <div className="flex flex-col items-end">
      <Button
        className="w-full"
        type="button"
        onClick={async () => {
          if (parentComment.handleFacadeCommentDeletion) {
            parentComment.handleFacadeCommentDeletion(comment.id as number)
          }

          await deleteComment(comment.id as number)
        }}
      >
        Excluir Comentário
      </Button>

      <section className="w-full flex flex-col bg-darker-white rounded-lg my-2 items-start justify-center p-2">
        <div className="flex w-full">
          <Link
            href={`/profile/${comment.authorId}`}
            className="capitalize px-2 font-semibold"
          >
            <Avatar
              size={'md'}
              src={getProfilePicURL(comment.author as PublicationAuthor)}
            />
          </Link>
          <div className="flex flex-col w-full">
            <Link
              href={`/profile/${comment.authorId}`}
              className="capitalize px-2 font-semibold"
            >
              {comment.author?.name}
            </Link>

            <label htmlFor="content"></label>
            <article
              title="content"
              id="content"
              className="resize-none w-full bg-darker-white rounded-lg p-2 ml-2"
            >
              {comment.content}
            </article>
          </div>

          <div className="flex flex-col items-center justify-center">
            {isOwner ?? (
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<BsThreeDots size={20} />}
                  variant="ghost"
                  color={'#242424'}
                  className="bg-opacity-25 absolute hover:text-darker-gray"
                ></MenuButton>

                <MenuList>
                  <MenuItem padding={0}>
                    <Button
                      className="w-full"
                      type="button"
                      onClick={async () => {
                        if (parentComment.handleFacadeCommentDeletion) {
                          parentComment.handleFacadeCommentDeletion(
                            comment.id as number,
                          )
                        }

                        await deleteComment(comment.id as number)
                      }}
                    >
                      Excluir Comentário
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}

            <LikeButton
              params={{
                option: 'commentId',
                likes: comment.likes?.length ?? 0,
                targetId: comment.id as number,
                isLiked,
              }}
            />
          </div>
        </div>

        <section className="w-[95%] p-2 mb-4 rounded-md">
          <div id="replies">
            {comment.replies?.map((reply) => (
              <CommentReply key={reply.id} comment={reply} />
            ))}
          </div>

          <NewCommentDialog
            target={{
              id: comment.id as number,
              type: 'parentCommentId',
            }}
          />
        </section>
      </section>
    </div>
  )
}
