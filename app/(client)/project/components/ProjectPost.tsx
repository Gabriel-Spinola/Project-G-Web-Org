'use client'

import React from 'react'
import { LikeProjectButton } from './LikeProjectButton'
import { Avatar } from '@chakra-ui/avatar'
import CommentModal from '@/components/comments/CommentModal'
import { FullProject } from '@/lib/types/common'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import { $Enums, Like, User } from '@prisma/client'
import { MdComment } from 'react-icons/md'
import { usePathname, useRouter } from 'next/navigation'
import { deleteProject } from '../_actions'
import { toast } from 'react-toastify'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiSolidShare } from 'react-icons/bi'
import { AiFillWarning } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import ProjectImagesCarousel from './ProjectImages'

type Props = {
  project: FullProject
  currentUserId?: string
}

export default function ProjectPost({ project, currentUserId }: Props) {
  const { data: session } = useSession()

  const router = useRouter()
  const pathName = usePathname()

  const isOwner = currentUserId === project.authorId

  const isLiked: boolean = project.likes.some(
    (like: Partial<Like>) => like.userId === currentUserId,
  )

  function CopyLink() {
    const postUrl = `https://${window.location.hostname}/project/${project.id}`

    navigator.clipboard.writeText(postUrl)

    toast.success('Link da publicação copiado')
  }

  return (
    // NOTE - PROJECT POST
    <section className="w-full flex flex-row-reverse h-[480px] md:h-[612px] rounded-xl">
      <section className="w-16 h-full flex flex-col items-center justify-evenly bg-medium-gray rounded-r-xl">
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

        <LikeProjectButton
          params={{
            option: 'projectId',
            targetId: project.id,
            likes: project.likes.length,
            isLiked,
          }}
        />

        <Avatar src={getProfilePicURL(project.author as User)} />

        <div className="text-pure-white hover:text-medium-primary">
          <CommentModal
            commentNumber={project.comments.length}
            publication={project}
            targetType="projectId"
            icon={<MdComment size={24} />}
          />
        </div>
      </section>

      <ProjectImagesCarousel
        imagesSrc={project.images}
        projectOwner={project.authorId}
      />
    </section>
  )
}
