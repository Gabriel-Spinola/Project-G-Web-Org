/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

// REVIEW - Chakra Modals may be adding too much memory cost.
// import NewPostModal from '@/components/posts/postSubmit/NewPostModal'
import InfiniteScrollPosts from '@/components/posts/InfiniteScrollPosts'
import { fetchPosts } from './(feed)/_actions'
import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import PostSubmitFragment from '@/components/posts/postSubmit/PostSubmitFragment'
import FeedSideBar from '@/components/feed/FeedSideBar'

export default async function Home() {
  const posts = await fetchPosts()
  const session = await getServerSession(AuthOptions)

  return (
    <main className="flex min-h-screen justify-around flex-row bg-darker-white mt-[88px]">
      {session && <FeedSideBar />}

      <div className="flex flex-col items-center min-w-full sm:min-w-[480px] md:min-w-[680px] lg:min-w-[800px] lg:max-w-[800px]">
        <PostSubmitFragment />

        <Suspense fallback={<span>loading feed...</span>}>
          {!posts.error ? (
            <section className="relative sm:min-w-[480px] md:min-w-[680px] lg:min-w-[800px]">
              <InfiniteScrollPosts
                initialPublication={posts.data ?? undefined}
                session={session?.user.id as string}
              />
            </section>
          ) : (
            <h1>Feed Failed to load</h1>
          )}
        </Suspense>
      </div>
    </main>
  )
}
