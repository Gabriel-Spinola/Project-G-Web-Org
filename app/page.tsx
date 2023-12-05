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
import Link from 'next/link'
import { MdPushPin } from 'react-icons/md'

export default async function Home() {
  const posts = await fetchPosts()
  const session = await getServerSession(AuthOptions)

  return (
    <main className="relative flex min-h-[calc(100vh-88px)] justify-around flex-row bg-darker-white mt-[88px]">
      <div className="flex mt-8 flex-col items-center min-w-full sm:min-w-[480px] md:min-w-[680px] md:max-w-[680px]">
        <div className="w-full">
          <PostSubmitFragment modal={<NewPostModal />} />
          <div className="flex justify-evenly my-4">
            <Link
              className="w-full flex px-8 py-4 bg-darker-white border-b-2 border-medium-primary hover:brightness-75"
              href={`/profile/${session?.user.id}/pins/`}
            >
              Veja seus posts salvos <MdPushPin size={16} />
            </Link>
          </div>
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
      </div>
    </main>
  )
}
