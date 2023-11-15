import { fetchPublication } from '@/app/(feed)/_actions'
import { ESResponse, FullPost } from '@/lib/types/common'
import { Project } from '@prisma/client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useState, useCallback, useEffect } from 'react'

// TODO: Generalize Feed - Incomplete
export function useFeed<Publication extends FullPost | Project>(
  initialPublication: Publication[] | undefined,
  shouldFetch: boolean,
  profileId?: string,
): {
  publication: Publication[] | undefined
  noPublicationFound: boolean
} {
  const [posts, setPosts] = useState<Publication[] | undefined>(
    initialPublication,
  )
  const [page, setPages] = useState<number>(1)
  const [noPostFound, setNoPostFound] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const deletedPost = searchParams.get('delete')
  const createdPost = searchParams.get('create')

  // NOTE - Memoize all loaded posts
  const loadMorePosts = useCallback(
    async function (signal: AbortSignal) {
      const next = page + 1
      const { data, error }: ESResponse<Publication[]> = await fetchPublication(
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
    if (shouldFetch) {
      loadMorePosts(signal)
    }

    if (createdPost) {
      setPages(0)
      setPosts([])
      setNoPostFound(false)

      loadMorePosts(signal)

      router.replace(pathname, { scroll: false })
    }

    // Abort api fetch when needed
    return (): void => {
      controller.abort()
    }
  }, [createdPost, shouldFetch, loadMorePosts, pathname, router])

  // NOTE - Handles url callbacks for any non-api-related feed update
  useEffect(() => {
    if (deletedPost) {
      setPosts((prev) => prev?.filter((post) => post.id !== deletedPost))

      router.replace(pathname, { scroll: false })
    }
  }, [deletedPost, router, pathname])

  return { publication: posts, noPublicationFound: noPostFound }
}
