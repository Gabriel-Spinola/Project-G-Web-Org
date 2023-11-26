'use client'

import InfiniteScrollPosts from '@/components/posts/InfiniteScrollPosts'
import NewPostModal from '@/components/posts/postSubmit/NewPostModal'
import PostSubmitFragment from '@/components/posts/postSubmit/PostSubmitFragment'
import { FullPost, FullProject } from '@/lib/types/common'
import React, { Suspense, useState } from 'react'
import ProjectFeed from '../../project/components/ProjectFeed'
import styles from './profile.module.scss'

type FeedSelectOptions = 'posts' | 'projects'

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

  const [selectedFeed, setSelectedFeed] = useState<FeedSelectOptions>('posts')

  return (
    <section id="feed" className="w-full">
      <div id="selectors" className="w-full flex p-4 text-xl">
        <button
          onClick={() => setSelectedFeed('posts')}
          className={`w-full ${styles.underScore} ${
            selectedFeed === 'posts'
              ? 'text-darker-primary font-semibold'
              : ' text-medium-gray'
          }`}
        >
          POSTS
          <div></div>
        </button>

        <button
          onClick={() => setSelectedFeed('projects')}
          className={`w-full ${styles.underScore} ${
            selectedFeed === 'projects'
              ? 'text-darker-primary font-semibold'
              : ' text-medium-gray'
          }`}
        >
          PROJETOS
          <div></div>
        </button>
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
