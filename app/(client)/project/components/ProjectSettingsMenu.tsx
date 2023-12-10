import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { $Enums } from '@prisma/client'
import React from 'react'
import { AiFillWarning } from 'react-icons/ai'
import { BiSolidShare } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { deleteProject } from '../_actions'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ProjectType } from '@/lib/types/common'

type Props = {
  currentUserId?: string
  project: Pick<ProjectType, 'authorId' | 'id'>
}

export default function ProjectSettingsMenu({ currentUserId, project }: Props) {
  const { data: session } = useSession()

  const router = useRouter()
  const pathName = usePathname()

  const isOwner = currentUserId === project.authorId

  async function CopyLink() {
    const toast = (await import('react-toastify')).toast
    const postUrl = `https://${window.location.hostname}/project/${project.id}`

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
            <MenuItem
              bg={'#262626'}
              _hover={{ bg: '#202020' }}
              onClick={async () => {
                const toast = (await import('react-toastify')).toast
                const { error } = await deleteProject(project.id)

                if (error) {
                  toast.error('Falha ao deleter projeto 😔')

                  return
                }

                router.replace(`${pathName}?delete=${project.id}`, {
                  scroll: false,
                })
              }}
            >
              Deletar publicação
            </MenuItem>
          </>
        ) : null}
      </MenuList>
    </Menu>
  )
}
