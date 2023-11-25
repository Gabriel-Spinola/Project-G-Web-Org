'use client'

import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiSolidShare } from 'react-icons/bi'
import { AiFillWarning } from 'react-icons/ai'
import { GiExpand } from 'react-icons/gi'
import { $Enums } from '@prisma/client'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'
import { FullPost, FullProject } from '@/lib/types/common'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

interface Props {
  publication: FullPost | FullProject
  isOwner: boolean
  deleteButton: ReactNode
}

export default function PostSettings({
  publication,
  isOwner,
  deleteButton,
}: Props) {
  const { data: session } = useSession()

  function CopyLink() {
    const postUrl = `https://${window.location.hostname}/posts/${publication.id}`

    navigator.clipboard.writeText(postUrl)

    alert('Link da publicação copiado')
  }

  return (
    <div className="flex">
      <Link
        className="flex p-2 w-[40px] h-[40px] items-center justify-center hover:bg-[#EDF2F7] rounded-md"
        href={`/posts/${publication.id}`}
      >
        <GiExpand size={20} color={'#242424'} />
      </Link>

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
                {deleteButton}
              </MenuItem>
            </>
          ) : null}
        </MenuList>
      </Menu>
    </div>
  )
}
