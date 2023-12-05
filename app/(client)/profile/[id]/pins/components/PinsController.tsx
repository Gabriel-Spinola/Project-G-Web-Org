'use client'

import { PublicationContext } from '@/components/posts/InfiniteScrollPosts'
import PostItem from '@/components/posts/PostItem'
import { useFeed } from '@/hooks/useFeed'
import { FullPost } from '@/lib/types/common'
import { CircularProgress } from '@chakra-ui/react'
import React from 'react'
import { fetchPinnedPosts } from '../../_actions'
import { useInView } from 'react-intersection-observer'

type Props = {
  initialPublication: FullPost[] | undefined
  session: string
  profileId?: string
}

export default function PinsController({
  initialPublication,
  session,
  profileId,
}: Props) {
  const [ref, inView] = useInView()
  const { publications: posts, noPublicationFound: noPostFound } = useFeed(
    initialPublication,
    inView,
    (page, signal) =>
      fetchPinnedPosts({
        page,
        signal,
        authorId: profileId as string,
      }),
  )

  return (
    <section className="flex flex-col mt-8 gap-8">
      {posts?.map((post: FullPost) => (
        <div key={post.id} className="max-w-full">
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
