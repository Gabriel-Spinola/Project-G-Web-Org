import { ESResponse, PostType, ProjectType } from '@/lib/types/common'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import { useState, useCallback, useEffect } from 'react'

export function useFeed<Publication extends PostType | ProjectType>(
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

  const deletedPublication = searchParams.get('delete')
  const createdPublication = searchParams.get('create')

  // NOTE - Memoize all loaded publications
  const loadMorePublications = useCallback(
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
      setPublications((prevPublication) => [
        ...(prevPublication?.length ? prevPublication : []),
        ...data,
      ])
    },
    [fetchFunction, page, profileId],
  )

  // NOTE - Handles feed data fetching
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    // If the spinner is in the client view load more publications.
    if (shouldLoadMore) {
      loadMorePublications(signal)
    }

    if (createdPublication) {
      setPages(0)
      setPublications([])
      setNoPublicationFound(false)

      loadMorePublications(signal)

      router.replace(pathname, { scroll: false })
    }

    // Abort api fetch when needed
    return (): void => {
      controller.abort()
      router.replace(pathname, { scroll: false })
    }
  }, [
    createdPublication,
    shouldLoadMore,
    loadMorePublications,
    pathname,
    router,
  ])

  // NOTE - Handles url callbacks for any non-api-related feed update
  useEffect(() => {
    if (deletedPublication) {
      setPublications(
        (prev) =>
          prev?.filter((publication) => publication.id !== deletedPublication),
      )

      router.replace(pathname, { scroll: false })
    }
  }, [deletedPublication, router, pathname])

  return { publications, noPublicationFound }
}
