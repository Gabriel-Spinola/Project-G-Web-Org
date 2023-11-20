import React from 'react'
import { fetchProjects } from './_actions'
import ProjectFeed from './components/ProjectFeed'

export default async function Projects() {
  const { data: projects, error } = await fetchProjects()

  if (error || !projects) {
    return <>Failed to load projects</>
  }

  return (
    <main className="mt-16 flex ml-5">
      <div className="w-full flex-col items-center justify-center">
        <ProjectFeed initialPublication={projects} />
      </div>

      {/* <Searchbar /> */}
      {/* <InfiniteScrollPosts> */}
    </main>
  )
}
