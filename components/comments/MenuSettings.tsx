'use client'

import { deleteComment } from '@/server/likeActions'
import { TDisplayComment } from '@/lib/types/common'
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { CommentCallbacks } from './CommentModal'

type Props = {
  comment: Partial<TDisplayComment>
}

export default function MenuSettings({ comment }: Props) {
  const context = useContext(CommentCallbacks)

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BsThreeDots size={20} />}
        variant="ghost"
        color={'#242424'}
        className="bg-opacity-25 absolute hover:text-darker-gray"
      />

      <MenuList>
        <MenuItem padding={0}>
          <Button
            className="w-full"
            type="button"
            onClick={async () => {
              context?.onFacadeCommentDeletion(comment.id as number)

              await deleteComment(comment.id as number)
            }}
          >
            Excluir Comentário
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
