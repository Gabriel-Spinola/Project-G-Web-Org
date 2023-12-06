'use client'

import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { $Enums } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { AiFillWarning } from 'react-icons/ai'
import { BiSolidShare } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import DeletePostButton from '../Buttons/DeletePostButton'

type Props = {
  isOwner: boolean
  publicationId: string
}

export default function PostSettingsMenu({ isOwner, publicationId }: Props) {
  const { data: session } = useSession()

  async function CopyLink() {
    const toast = (await import('react-toastify')).toast
    const postUrl = `https://${window.location.hostname}/posts/${publicationId}`

    navigator.clipboard.writeText(postUrl)
    toast.success('Link da publicação copiado')
  }

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

      <MenuList
        paddingY={2}
        width={72}
        shadow={'lg'}
        bg={'#262626'}
        textColor={'#ebebeb'}
      >
        <MenuItem bg={'#262626'} _hover={{ bg: '#202020' }} gap={'16px'}>
          <span onClick={CopyLink} className="flex flex-row">
            <BiSolidShare size={20} />
            Compartilhar publicação
          </span>
        </MenuItem>

        {!isOwner ? (
          <MenuItem bg={'#262626'} _hover={{ bg: '#202020' }} gap={'16px'}>
            <AiFillWarning size={20} />
            Denunciar publicação
          </MenuItem>
        ) : null}

        {isOwner || session?.user.position === $Enums.Positions.Admin ? (
          <>
            <MenuItem bg={'#262626'} _hover={{ bg: '#202020' }}>
              <DeletePostButton postId={publicationId} />
            </MenuItem>
          </>
        ) : null}
      </MenuList>
    </Menu>
  )
}
