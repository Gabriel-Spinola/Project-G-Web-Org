'use client'

import React from 'react'
import { fetchProjects } from '../_actions'
import { useInView } from 'react-intersection-observer'
import { FullProject } from '@/lib/types/common'
import { useFeed } from '@/hooks/useFeed'
import ProjectPost from './ProjectPost'
import { CircularProgress } from '@chakra-ui/react'

type Props = {
  initialPublication: FullProject[] | undefined
  profileId?: string
}

export default function ProjectFeed({ initialPublication, profileId }: Props) {
  const [ref, inView] = useInView()
  const { publications: projects, noPublicationFound: noProjectFound } =
    useFeed(initialPublication, inView, fetchProjects, profileId)

  return (
    <section id="feed">
      {projects?.map((project: FullProject) => (
        <ProjectPost key={project.id} project={project} />
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
