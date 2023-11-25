'use client'

import InfiniteScrollPosts from '@/components/posts/InfiniteScrollPosts'
import NewPostModal from '@/components/posts/postSubmit/NewPostModal'
import PostSubmitFragment from '@/components/posts/postSubmit/PostSubmitFragment'
import { FullPost, FullProject } from '@/lib/types/common'
import React, { Suspense, useState } from 'react'
import ProjectFeed from '../../project/components/ProjectFeed'

type Feed = 'posts' | 'projects'

type Props = {
  mustServerFetched: {
    startupProjects?: FullProject[]
    startupPosts?: FullPost[]
    currentUserId?: string
  }

  authorId: string
  isOwner: boolean
}

export default function ProfileFeed({
  mustServerFetched,
  authorId,
  isOwner,
}: Props) {
  const { startupPosts, startupProjects, currentUserId } = mustServerFetched

  const [selectedFeed, setSelectedFeed] = useState<Feed>('posts')

  console.log(isOwner)

  return (
    <section id="feed">
      <div id="selectors">
        <button onClick={() => setSelectedFeed('posts')}>posts</button>
        <button onClick={() => setSelectedFeed('projects')}>projects</button>
      </div>

      {selectedFeed === 'posts' ? (
        <section id="PostWrapper" className="flex flex-col">
          {isOwner ? (
            <PostSubmitFragment modal={<NewPostModal />} />
          ) : undefined}

          <div className="flex flex-col justify-center">
            <InfiniteScrollPosts
              initialPublication={startupPosts}
              profileId={authorId}
              session={currentUserId as string}
            />
          </div>
        </section>
      ) : (
        <Suspense fallback={<span>Loading projects feed...</span>}>
          <ProjectFeed
            initialPublication={startupProjects}
            profileId={authorId}
            currentUserId={currentUserId}
          />
        </Suspense>
      )}
    </section>
  )
}
