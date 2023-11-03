/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

// FIXME - Chakra Modals may be adding too much memory cost.

import InfiniteScrollPosts from '@/components/posts/InfiniteScrollPosts'
import PostSubmitFragment from '@/components/posts/postSubmit/PostSubmitFragment'
import { AuthOptions } from '@/lib/auth'
import { ESResponse, FullPost } from '@/lib/types/common'
import { getServerSession } from 'next-auth'
import { fetchPosts } from './(feed)/_actions'
import { $Enums } from '@prisma/client'

export default async function Home() {
  const sessionPromise = getServerSession(AuthOptions)
  const postsPromise = fetchPosts<FullPost>()

  const [session, posts] = await Promise.all([sessionPromise, postsPromise])

  return (
    <main className="flex min-h-screen justify-around flex-row bg-darker-white">
      <div className="feed flex flex-col items-center">
        <PostSubmitFragment currentUserId={session?.user.id} />

        {!posts.error ? (
          <>
            {posts.data && posts.data?.length > 0 ? (
              <InfiniteScrollPosts
                initialPublication={posts.data}
                currentUserData={
                  session
                    ? {
                        id: session?.user.id as string,
                        position: session?.user.position as $Enums.Positions,
                      }
                    : undefined
                }
              />
            ) : (
              <>Oops você chegou ao fim!</>
            )}
          </>
        ) : (
          <h1>Feed Failed to load</h1>
        )}
      </div>
    </main>
  )
}
