import { deleteComment } from '@/app/(feed)/_serverActions'
import { TDisplayComment } from '@/lib/types/common'
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'

type Props = {
  comment: Partial<TDisplayComment>
  handleFacadeCommentDeletion?: (id: number) => void
}

export default function MenuSettings({
  comment,
  handleFacadeCommentDeletion,
}: Props) {
  return (
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
              if (handleFacadeCommentDeletion) {
                handleFacadeCommentDeletion(comment.id as number)
              }

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
