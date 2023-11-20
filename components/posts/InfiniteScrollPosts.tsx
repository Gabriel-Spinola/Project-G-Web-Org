'use client'

import React, { createContext } from 'react'
import PostItem from './PostItem'
import { CircularProgress } from '@chakra-ui/react'
import { useFeed } from '@/hooks/useFeed'
import { FullPost } from '@/lib/types/common'
import { useInView } from 'react-intersection-observer'
import { fetchPost, fetchPosts } from '@/app/(feed)/_actions'

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
        <div key={post.id}>
          <PublicationContext.Provider value={{ ...post, session }}>
            <PostItem />
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
          <CircularProgress
            isIndeterminate
            color="black"
            size={8}
            marginBottom={8}
          />
        </div>
      )}
    </section>
  )
}
