'use client'

import React from 'react'
import { LikeProjectButton } from './LikeProjectButton'
import { FullProject } from '@/lib/types/common'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import { Like, Pin, User } from '@prisma/client'
import { MdComment } from 'react-icons/md'
import ProjectImagesCarousel from './ProjectImages'
import PinButton from '@/components/Buttons/PinButton'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Avatar from '@/components/Avatar'

const DynamicCommentModal = dynamic(
  () => import('@/components/comments/CommentModal'),
  { ssr: false },
)

const DynamicProjectSettings = dynamic(() => import('./ProjectSettingsMenu'), {
  ssr: false,
})

type Props = {
  project: FullProject
  currentUserId?: string
}

export default function ProjectPost({ project, currentUserId }: Props) {
  const isLiked: boolean = project.likes.some(
    (like: Partial<Like>) => like.userId === currentUserId,
  )
  const isPinned: boolean =
    project?.pins?.some((pin: Partial<Pin>) => pin.userId === currentUserId) ??
    false

  function getCommentsCount(): number {
    if (!project?.comments) {
      return 0
    }

    let count = 0

    for (const comment of project.comments) {
      count += comment.replies?.length ?? 0
    }

    return project.comments.length + count
  }

  return (
    // NOTE - PROJECT POST
    <section className="w-full flex flex-row-reverse h-[480px] md:h-[612px] rounded-xl">
      <section className="w-16 h-full flex flex-col items-center justify-evenly bg-medium-gray rounded-r-xl">
        <DynamicProjectSettings
          currentUserId={currentUserId}
          project={project}
        />

        <LikeProjectButton
          params={{
            option: 'projectId',
            targetId: project.id,
            likes: project.likes.length,
            isLiked,
          }}
        />

        <Link href={`/profile/${project.author?.name}`}>
          <Avatar
            size="lg"
            imageUrl={getProfilePicURL(project.author as User)}
          />
        </Link>

        <PinButton
          isPinned={isPinned}
          targetId={project.id}
          option="projectId"
          iconColor="pure-white"
        />

        <div className="text-pure-white hover:text-medium-primary">
          <DynamicCommentModal
            commentNumber={getCommentsCount()}
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
