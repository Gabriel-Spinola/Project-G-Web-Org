'use client'

import React from 'react'
import { fetchProjects } from '../_actions'
import { useInView } from 'react-intersection-observer'
import { ESResponse, ProjectType } from '@/lib/types/common'
import { useFeed } from '@/hooks/useFeed'
import dynamic from 'next/dynamic'
import Loader from '@/components/Loader'
import ProjectPostSkeleton from './skeletons/ProjectPostSkeleton'
import { Session } from 'next-auth'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { isProfissionalAccount } from '@/lib/auth/actions'

const DynamicProjectPost = dynamic(() => import('./ProjectPost'), {
  ssr: false,
  loading: () => <ProjectPostSkeleton />,
})

type Props = {
  initialPublication: ProjectType[] | undefined
  profileId?: string
  currentUserId?: string
  session?: Session | null
  customFetch?: (
    page: number,
    signal?: AbortSignal,
    authorId?: string,
  ) => Promise<ESResponse<ProjectType[]>>
}

export default function ProjectFeed({
  initialPublication,
  profileId,
  currentUserId,
  customFetch,
}: Props) {
  const { data: session } = useSession()
  const [ref, inView] = useInView()

  const { publications: projects, noPublicationFound: noProjectFound } =
    useFeed(initialPublication, inView, customFetch ?? fetchProjects, profileId)

  return (
    <section
      id="feed"
      className="w-full flex flex-col items-center justify-center gap-8 "
    >
      {isProfissionalAccount(session) && (
        <Link
          href={'/project/mutate'}
          className="mt-8 w-full bg-darker-gray px-8 py-8 rounded-lg text-darker-white text-xl hover:scale-[101%]"
        >
          Crie um Projeto
        </Link>
      )}

      {projects?.map((project: ProjectType) => (
        <DynamicProjectPost
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
          <Loader />
        </div>
      )}
    </section>
  )
}
