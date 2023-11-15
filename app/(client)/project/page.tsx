import InfiniteScrollPosts from '@/components/posts/InfiniteScrollPosts'
import React from 'react'
import ProjectPost from './components/ProjectPost'

export default function Projects() {
  return (
    <main className="mt-16">
      <div className="w-full flex items-center justify-center">
        <ProjectPost />
      </div>

      {/* <Searchbar /> */}
      {/* <InfiniteScrollPosts> */}
    </main>
  )
}
