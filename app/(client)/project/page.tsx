import React from 'react'
import ProjectPost from './components/ProjectPost'
import { fetchProjects } from './_actions'
import { FullProject } from '@/lib/types/common'

export default async function Projects() {
  const { data: projects, error } = await fetchProjects()

  if (error || !projects) {
    return <>Failed to load projects</>
  }

  return (
    <main className="mt-16 flex ml-5">
      <div className="w-full flex-col items-center justify-center">
        {projects.map((project: FullProject) => (
          <ProjectPost key={project.id} project={project} />
        ))}
      </div>

      {/* <Searchbar /> */}
      {/* <InfiniteScrollPosts> */}
    </main>
  )
}
