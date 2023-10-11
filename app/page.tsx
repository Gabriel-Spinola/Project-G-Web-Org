/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

// FIXME - Chakra Modals may be adding too much memory cost.

import PostSubmitFragment from '@/components/posts/poster/PostSubmitFragment'
import { fetchPosts, revalidateFeed } from './(feed)/_feedActions'
import { ESResponse, FullPost } from '@/lib/types/common'
import InfiniteScrollPosts from '@/components/posts/InfiniteScrollPosts'
import { Session, getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'

export default async function Home() {
  const session: Session | null = await getServerSession(AuthOptions)
  const { data, error }: ESResponse<FullPost[]> = await fetchPosts()

  return (
    <main className="flex min-h-screen justify-around flex-row bg-darker-white">
      <div className="feed flex flex-col items-center">
        <PostSubmitFragment
          revalidate={revalidateFeed}
          currentUserId={session?.user.id}
        />

        {!error ? (
          <>
            {data && data?.length > 0 ? (
              <InfiniteScrollPosts
                initialPublication={data || undefined}
                currentUserId={session?.user.id}
                revalidate={revalidateFeed}
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
