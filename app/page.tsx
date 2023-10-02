import PostSubmitFragment from '@/components/posts/poster/PostSubmitFragment'
import { fetchPosts } from './feedActions'
import { ESResponse, FullPost } from '@/lib/common'
import InfiniteScrollPosts from '@/components/posts/InfiniteScrollPosts'

export default async function Home() {
  const { data, error }: ESResponse<FullPost[]> = await fetchPosts()

  return (
    <main className="flex min-h-screen justify-around flex-row bg-darker-white">
      <div className="feed flex flex-col items-center">
        <PostSubmitFragment></PostSubmitFragment>

        {!error ? (
          <InfiniteScrollPosts initialPosts={data || undefined} />
        ) : (
          <h1>Feed Failed to load</h1>
        )}
      </div>
    </main>
  )
}
