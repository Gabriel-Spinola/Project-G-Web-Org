'use client'

// import { fetchPosts } from '@/app/(feed)/_feedActions'
import { ESResponse, FullPost } from '@/lib/types/common'
import { useInView } from 'react-intersection-observer'
import React, { useCallback, useEffect, useState } from 'react'
import PostItem from './PostItem'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { fetchPosts } from '@/app/(feed)/_actions'
import { User } from '@prisma/client'
import { CircularProgress } from '@chakra-ui/react'

// TODO: Generalize Feed - Incomplete
type Params<Publication extends FullPost = FullPost> = {
  initialPublication: Publication[] | undefined
  currentUserData?: Pick<User, 'id' | 'position'>
  profileId?: string
}

export default function InfiniteScrollPosts<
  Publication extends FullPost = FullPost,
>({ initialPublication, currentUserData, profileId }: Params<Publication>) {
  const [posts, setPosts] = useState<Publication[] | undefined>(
    initialPublication,
  )
  const [page, setPages] = useState<number>(1)
  const [isNoPostFound, setNoPostFound] = useState<boolean>(false)
  const [ref, inView] = useInView()

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const deletedPost = searchParams.get('delete')
  const createdPost = searchParams.get('create')

  // NOTE - Memoize all loaded posts
  const loadMorePosts = useCallback(
    async function (signal: AbortSignal) {
      const next = page + 1
      const { data, error }: ESResponse<Publication[]> = await fetchPosts(
        next,
        signal,
        profileId,
      )

      if (error) {
        console.error(error)

        return
      }

      if (!data?.length || data?.length <= 0) {
        setNoPostFound(true)

        return
      }

      setPages((prevPage) => prevPage + 1)
      setPosts((prevPost: Publication[] | undefined) => [
        ...(prevPost?.length ? prevPost : []),
        ...data,
      ])
    },
    [page, profileId],
  )

  // NOTE - Handles feed data fetching
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    // If the spinner is in the client view load more posts.
    if (inView) {
      loadMorePosts(signal)
    }

    if (createdPost) {
      setPages(0)
      setPosts([])
      loadMorePosts(signal)

      router.replace(pathname, { scroll: false })
    }

    // Abort api fetch when needed
    return (): void => {
      controller.abort()
    }
  }, [createdPost, inView, initialPublication, loadMorePosts, pathname, router])

  // NOTE - Handles url callbacks for any non-api-related feed update
  useEffect(() => {
    if (deletedPost) {
      setPosts((prev) => prev?.filter((post) => post.id !== deletedPost))

      router.replace(pathname, { scroll: false })
    }
  }, [deletedPost, router, pathname])

  return (
    <>
      {posts?.map((post: Publication) => (
        <PostItem
          key={post.id}
          post={post}
          currentUserId={currentUserData?.id}
          currentUserPosition={currentUserData?.position}
        />
      ))}

      {/* loading spinner */}
      {isNoPostFound ? (
        <span className="col-span-1 m-8 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4">
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
    </>
  )
}
