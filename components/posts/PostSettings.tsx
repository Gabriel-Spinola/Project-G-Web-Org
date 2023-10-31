import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiSolidShare } from 'react-icons/bi'
import { AiFillWarning } from 'react-icons/ai'
import DeletePostButton from '../Buttons/DeletePostButton'
import { $Enums } from '@prisma/client'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'

interface Props {
  postId: string
  isOwner: boolean
  currentUserPosition: $Enums.Positions | undefined
}

export default function PostSettings({
  postId,
  isOwner,
  currentUserPosition,
}: Props) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BsThreeDotsVertical size={20} />}
        variant="ghost"
        color={'#242424'}
        className="bg-pure-white bg-opacity-25 absolute hover:text-darker-gray"
      ></MenuButton>
      <MenuList paddingY={2} shadow={'lg'} bg={'#262626'} textColor={'#ebebeb'}>
        <MenuItem bg={'#262626'} _hover={{ bg: '#202020' }} gap={'16px'}>
          <BiSolidShare size={20} />
          Compartilhar publicação
        </MenuItem>
        {!isOwner ? (
          <MenuItem bg={'#262626'} _hover={{ bg: '#202020' }} gap={'16px'}>
            <AiFillWarning size={20} />
            Denunciar publicação
          </MenuItem>
        ) : null}
        {isOwner || currentUserPosition === $Enums.Positions.Admin ? (
          <>
            <MenuItem bg={'#262626'} _hover={{ bg: '#202020' }}>
              <DeletePostButton postId={postId} />
            </MenuItem>
          </>
        ) : null}
      </MenuList>
    </Menu>
  )
}
