'use client'

import React from 'react'
import { fetchProjects } from '../_actions'
import { useInView } from 'react-intersection-observer'
import { ESResponse, FullProject } from '@/lib/types/common'
import { useFeed } from '@/hooks/useFeed'
import ProjectPost from './ProjectPost'
import { CircularProgress } from '@chakra-ui/react'

type Props = {
  initialPublication: FullProject[] | undefined
  profileId?: string
  currentUserId?: string
  customFetch?: (
    page: number,
    signal?: AbortSignal,
    authorId?: string,
  ) => Promise<ESResponse<FullProject[]>>
}

export default function ProjectFeed({
  initialPublication,
  profileId,
  currentUserId,
  customFetch,
}: Props) {
  const [ref, inView] = useInView()

  const { publications: projects, noPublicationFound: noProjectFound } =
    useFeed(initialPublication, inView, customFetch ?? fetchProjects, profileId)

  return (
    <section
      id="feed"
      className="w-full flex flex-col items-center justify-center gap-8 "
    >
      {projects?.map((project: FullProject) => (
        <ProjectPost
          key={project.id}
          project={project}
          currentUserId={currentUserId}
        />
      ))}

      {/* loading spinner */}
      {noProjectFound ? (
        <span className="col-span-1 mt-8 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4">
          Ops, parece que você chegou ao fim!
        </span>
      ) : (
        <div
          ref={ref}
          className="col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
        >
          <CircularProgress
            isIndeterminate
            color="black"
            size={8}
            marginBottom={8}
          />
        </div>
      )}
    </section>
  )
}
