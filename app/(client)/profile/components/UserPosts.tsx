import { fetchPosts } from '@/app/(feed)/_actions'
import InfiniteScrollPosts from '../../../../components/posts/InfiniteScrollPosts'
import PostSubmitFragment from '../../../../components/posts/postSubmit/PostSubmitFragment'
import { ESResponse, FullPost } from '@/lib/types/common'
import { $Enums } from '@prisma/client'
import { Suspense } from 'react'

type Params = {
  authorID: string
  currentUserPosition: $Enums.Positions | undefined
}

export default async function UserPosts({
  authorID,
  currentUserPosition,
}: Params) {
  const { data, error }: ESResponse<FullPost[]> = await fetchPosts(
    1,
    undefined,
    authorID,
  )

  return (
    <section id="PostWrapper" className="flex flex-col">
      <PostSubmitFragment currentUserId={authorID} />

      <Suspense fallback={<div>...Loading</div>}>
        {!error ? (
          <>
            {data && data?.length > 0 ? (
              <InfiniteScrollPosts
                initialPublication={data}
                currentUserId={authorID}
                currentUserPosition={currentUserPosition}
              />
            ) : (
              <>Oops você chegou ao fim!</>
            )}
          </>
        ) : (
          <h1>Feed Failed to load</h1>
        )}
      </Suspense>
    </section>
  )
}
