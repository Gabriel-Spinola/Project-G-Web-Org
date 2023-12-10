'use client'

import { PostType, ProjectType } from '@/lib/types/common'
import React, { Suspense, useState } from 'react'
import styles from '@/app/(client)/profile/components/profile.module.scss'
import { PublicationContext } from '@/components/posts/InfiniteScrollPosts'
import { useInView } from 'react-intersection-observer'
import { useFeed } from '@/hooks/useFeed'
import { fetchPinnedPosts, fetchPinnedProjects } from '../../_actions'
import ProjectFeed from '@/app/(client)/project/components/ProjectFeed'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import PostSkeleton from '@/components/posts/skeleton/PostSkeleton'
import Loader from '@/components/Loader'

const DynamicPostItem = dynamic(() => import('@/components/posts/PostItem'), {
  ssr: false,
  loading: () => <PostSkeleton />,
})

type FeedSelectOptions = 'posts' | 'projects'

type Props = {
  startupPosts?: PostType[]
  startupProjects?: ProjectType[]
  currentUserId?: string

  authorId: string
  isOwner: boolean
}

export default function PinsFeed({
  startupPosts,
  startupProjects,
  currentUserId,
  authorId,
}: Props) {
  const [selectedFeed, setSelectedFeed] = useState<FeedSelectOptions>('posts')
  const [ref, inView] = useInView()
  const { publications: posts, noPublicationFound: noPostFound } = useFeed(
    startupPosts,
    inView,
    (page, signal) =>
      fetchPinnedPosts({
        page,
        signal,
        authorId,
      }),
  )

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
          <div className="flex flex-col justify-center">
            {posts?.map((post: PostType) => (
              <div key={post.id} className="max-w-full">
                <PublicationContext.Provider
                  value={{ ...post, session: currentUserId as string }}
                >
                  <DynamicPostItem />
                </PublicationContext.Provider>
              </div>
            ))}

            {/* loading spinner */}
            {noPostFound ? (
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
          </div>
        </section>
      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-8 ">
          <Link
            className={`w-full mt-8 p-8 bg-gradient-to-tl bg-medium-gray text-darker-white hover:font-semibold rounded-xl hover:scale-[101%] text-start text-lg`}
            href="/project/mutate"
          >
            Adicione um projeto
          </Link>

          <Suspense fallback={<span>Loading projects feed...</span>}>
            <ProjectFeed
              initialPublication={startupProjects}
              profileId={authorId}
              currentUserId={currentUserId}
              customFetch={(page, signal) =>
                fetchPinnedProjects({
                  page,
                  signal,
                  authorId,
                })
              }
            />
          </Suspense>
        </div>
      )}
    </section>
  )
}
