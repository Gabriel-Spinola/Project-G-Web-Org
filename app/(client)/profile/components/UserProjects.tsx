import React, { Suspense } from 'react'
import { fetchProjects } from '../../project/_actions'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import ProjectFeed from '../../project/components/ProjectFeed'

type Props = { authorId: string }

export default async function UserProjects({ authorId }: Props) {
  const { data: projects, error } = await fetchProjects(1, undefined, authorId)
  const session = await getServerSession(AuthOptions)

  if (error || !projects) {
    return <>Failed to load projects</>
  }

  return (
    <section className="w-full flex flex-col gap-8">
      <h2 className=" text-center text-xl font-bold">PROJETOS</h2>

      <Suspense fallback={<span>Loading projects feed...</span>}>
        <ProjectFeed
          initialPublication={projects}
          profileId={authorId}
          currentUserId={session?.user.id}
        />
      </Suspense>
    </section>
  )
}
