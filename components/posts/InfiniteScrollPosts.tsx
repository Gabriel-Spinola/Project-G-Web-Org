'use client'

import React, { createContext } from 'react'
import { useFeed } from '@/hooks/useFeed'
import { FullPost } from '@/lib/types/common'
import { useInView } from 'react-intersection-observer'
import { fetchPosts } from '@/app/(feed)/_actions'
import dynamic from 'next/dynamic'
import Loader from '../Loader'
import PostSkeleton from './skeleton/PostSkeleton'

const DynamicPostItem = dynamic(() => import('./PostItem'), {
  ssr: false,
  loading: () => <PostSkeleton />,
})

export const PublicationContext = createContext<
  (FullPost & { session: string }) | null
>(null)

type Params = {
  initialPublication: FullPost[] | undefined
  session: string
  profileId?: string
}

export default function InfiniteScrollPosts({
  initialPublication,
  session,
  profileId,
}: Params) {
  const [ref, inView] = useInView()
  const { publications: posts, noPublicationFound: noPostFound } = useFeed(
    initialPublication,
    inView,
    fetchPosts,
    profileId,
  )

  return (
    <section id="feed">
      {posts?.map((post: FullPost) => (
        <div key={post.id} className="max-w-full">
          <PublicationContext.Provider value={{ ...post, session }}>
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
    </section>
  )
}
