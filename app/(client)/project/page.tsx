import React, { Suspense } from 'react'
import { fetchProjects } from './_actions'
import ProjectFeed from './components/ProjectFeed'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'

export default async function Projects() {
  const { data: projects, error } = await fetchProjects()
  const session = await getServerSession(AuthOptions)

  if (error || !projects) {
    return <>Failed to load projects</>
  }

  return (
    <main className="mt-16 flex ml-5">
      <div className="w-full flex-col items-center justify-center">
        <Suspense fallback={<span>Loading feed...</span>}>
          <ProjectFeed
            initialPublication={projects ?? undefined}
            currentUserId={session?.user.id}
          />
        </Suspense>
      </div>

      {/* <Searchbar /> */}
      {/* <InfiniteScrollPosts> */}
    </main>
  )
}
