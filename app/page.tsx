// LINK: https://www.youtube.com/watch?v=ytkG7RT6SvU

import PostSubmitFragment from '@/components/posts/poster/PostSubmitFragment'
import PostItem from '@/components/posts/PostItem'
import { fetchPosts } from './feedActions'
import { ESResponse, FullPost } from '@/lib/common'
import InfiniteScrollPosts from '@/components/posts/InfiniteScrollPosts'

// LINK - https://www.youtube.com/watch?v=IFYFezylQlI
export default async function Home() {
  const { data, error }: ESResponse<FullPost[]> = await fetchPosts()

  return (
    <main className="flex min-h-screen justify-around flex-row bg-darker-white">
      <div className="feed flex flex-col items-center">
        <PostSubmitFragment></PostSubmitFragment>

        {!error ? (
          <>
            <h1>WOrked</h1>

            <InfiniteScrollPosts initialPosts={data || undefined} />
          </>
        ) : (
          <>
            <h1>Failed</h1>
          </>
        )}
      </div>
    </main>
  )
}
