import React from 'react'
import { LikeProjectButton } from './LikeProjectButton'
import { Avatar } from '@chakra-ui/avatar'
import CommentModal from '@/components/comments/CommentModal'
import { FullProject } from '@/lib/types/common'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import { Like, User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import { MdComment } from 'react-icons/md'
import PostSettings from '@/components/posts/PostSettings'

type Props = {
  project: FullProject
}

export default async function ProjectPost({ project }: Props) {
  const session = await getServerSession(AuthOptions)

  const isOwner = session?.user.id === project.authorId
  const isLiked: boolean = project.likes.some(
    (like: Partial<Like>) => like.userId === session?.user.id,
  )

  return (
    // NOTE - PROJECT POST
    <section className="w-full flex flex-row-reverse md:w-[90%] h-[480px] md:h-[612px] rounded-xl bg-medium-tertiary mb-5">
      <section className="w-16 h-full flex flex-col items-center justify-evenly bg-medium-gray rounded-r-xl">
        <PostSettings publication={project} isOwner={isOwner} />

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
