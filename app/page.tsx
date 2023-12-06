/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

// REVIEW - Chakra Modals may be adding too much memory cost.

import InfiniteScrollPosts from '@/components/posts/InfiniteScrollPosts'
import PostSubmitFragment from '@/components/posts/postSubmit/PostSubmitFragment'
import { fetchPosts } from './(feed)/_actions'
import { Suspense } from 'react'
import NewPostModal from '@/components/posts/postSubmit/NewPostModal'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import FeedSideBar from '@/components/feed/FeedSideBar'

export default async function Home() {
  const posts = await fetchPosts()
  const session = await getServerSession(AuthOptions)

  return (
    <main className="relative flex min-h-[calc(100vh-88px)] justify-around flex-row bg-darker-white mt-[88px]">
      {session && <FeedSideBar />}

      <section className="flex gap-8 mt-8 flex-col items-center min-w-full sm:min-w-[480px] md:min-w-[680px] md:max-w-[680px]">
        <div className="w-full">
          <PostSubmitFragment modal={<NewPostModal />} />
        </div>

        <Suspense fallback={<span>loading feed...</span>}>
          {!posts.error ? (
            <section className="relative sm:min-w-[480px] md:min-w-[680px] md:max-w-[680px]">
              <InfiniteScrollPosts
                initialPublication={posts.data ?? undefined}
                session={session?.user.id as string}
              />
            </section>
          ) : (
            <h1>Feed Failed to load</h1>
          )}
        </Suspense>
      </section>
    </main>
  )
}
