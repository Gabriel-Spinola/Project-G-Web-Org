import { fetchPosts } from '@/app/feedActions'
import InfiniteScrollPosts from '../posts/InfiniteScrollPosts'
import PostSubmitFragment from '../posts/poster/PostSubmitFragment'
import { ESResponse, FullPost } from '@/lib/types/common'

type Params = { authorID: string }

export default async function UserPosts({ authorID }: Params) {
  const { data, error }: ESResponse<FullPost[]> = await fetchPosts(1, authorID)

  return (
    <section id="PostWrapper" className="flex flex-col">
      <PostSubmitFragment />

      {!error ? (
        <InfiniteScrollPosts initialPublication={data || undefined} />
      ) : (
        <h1>Failed to load feed</h1>
      )}
    </section>
  )
}
