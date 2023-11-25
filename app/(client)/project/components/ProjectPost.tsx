'use client'

import React from 'react'
import { LikeProjectButton } from './LikeProjectButton'
import { Avatar } from '@chakra-ui/avatar'
import CommentModal from '@/components/comments/CommentModal'
import { FullProject } from '@/lib/types/common'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import { Like, User } from '@prisma/client'
import { MdComment } from 'react-icons/md'
import PostSettings from '@/components/posts/PostSettings'
import { usePathname, useRouter } from 'next/navigation'
import { deleteProject } from '../_actions'
import { toast } from 'react-toastify'

type Props = {
  project: FullProject
  currentUserId?: string
}

export default function ProjectPost({ project, currentUserId }: Props) {
  const router = useRouter()
  const pathName = usePathname()

  const isOwner = currentUserId === project.authorId
  console.log(currentUserId)
  const isLiked: boolean = project.likes.some(
    (like: Partial<Like>) => like.userId === currentUserId,
  )

  return (
    // NOTE - PROJECT POST
    <section className="w-full flex flex-row-reverse md:w-[90%] h-[480px] md:h-[612px] rounded-xl bg-medium-tertiary mb-5">
      <section className="w-16 h-full flex flex-col items-center justify-evenly bg-medium-gray rounded-r-xl">
        <PostSettings
          publication={project}
          isOwner={isOwner}
          deleteButton={
            <button
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
              deletar
            </button>
          }
        />

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
    </section>
  )
}
