// FIXME - Prisma's sometimes failing to load feed

import PostSubmitFragment from '@/components/posts/poster/PostSubmitFragment'
import { fetchPosts } from './feedActions'
import { ESResponse, FullPost } from '@/lib/common'
import InfiniteScrollPosts from '@/components/posts/InfiniteScrollPosts'
import { Session, getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'

export default async function Home() {
  const session: Session | null = await getServerSession(AuthOptions)
  const { data, error }: ESResponse<FullPost[]> = await fetchPosts()

  return (
    <main className="flex min-h-screen justify-around flex-row bg-darker-white">
      <div className="feed flex flex-col items-center">
        <PostSubmitFragment></PostSubmitFragment>

        {!error ? (
          <InfiniteScrollPosts
            initialPublication={data || undefined}
            currentUserId={session?.user.id}
          />
        ) : (
          <h1>Feed Failed to load</h1>
        )}
      </div>
    </main>
  )
}
