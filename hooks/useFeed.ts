import { ESResponse, FullPost, FullProject } from '@/lib/types/common'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import { useState, useCallback, useEffect } from 'react'

export function useFeed<Publication extends FullPost | FullProject>(
  initialPublication: Publication[] | undefined,
  shouldLoadMore: boolean,
  fetchFunction: (
    page: number,
    signal?: AbortSignal,
    authorId?: string,
  ) => Promise<ESResponse<Publication[]>>,
  profileId?: string,
): {
  publications: Publication[] | undefined
  noPublicationFound: boolean
} {
  const [publications, setPublications] = useState<Publication[] | undefined>(
    initialPublication,
  )
  const [page, setPages] = useState<number>(1)
  const [noPublicationFound, setNoPublicationFound] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const deletedPost = searchParams.get('delete')
  const createdPost = searchParams.get('create')

  // NOTE - Memoize all loaded posts
  const loadMorePosts = useCallback(
    async function (signal: AbortSignal) {
      const next = page + 1
      const { data, error }: ESResponse<Publication[]> = await fetchFunction(
        next,
        signal,
        profileId,
      )

      if (error) {
        console.error(error)

        return
      }

      if (!data?.length || data?.length <= 0) {
        setNoPublicationFound(true)

        return
      }

      setPages((prevPage) => prevPage + 1)
      setPublications((prevPost) => [
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
    if (shouldLoadMore) {
      loadMorePosts(signal)
    }

    if (createdPost) {
      setPages(0)
      setPublications([])
      setNoPublicationFound(false)

      loadMorePosts(signal)

      router.replace(pathname, { scroll: false })
    }

    // Abort api fetch when needed
    return (): void => {
      controller.abort()
    }
  }, [createdPost, shouldLoadMore, loadMorePosts, pathname, router])

  // NOTE - Handles url callbacks for any non-api-related feed update
  useEffect(() => {
    if (deletedPost) {
      setPublications((prev) => prev?.filter((post) => post.id !== deletedPost))

      router.replace(pathname, { scroll: false })
    }
  }, [deletedPost, router, pathname])

  return { publications, noPublicationFound }
}
