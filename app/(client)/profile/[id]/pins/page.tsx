import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React, { Suspense } from 'react'
import { fetchPinnedPosts, fetchPinnedProjects } from '../_actions'
import PinsController from './components/PinsController'

type Props = {
  params: { id: string }
}

export default async function Pins({ params }: Props) {
  const { id } = params

  const { data: posts, error: postError } = await fetchPinnedPosts({
    page: 1,
    authorId: id,
  })
  const { data: projects, error: projectError } = await fetchPinnedProjects({
    page: 1,
    authorId: id,
  })

  const session = await getServerSession(AuthOptions)

  return (
    <main className="flex min-h-screen justify-around flex-row bg-darker-white mt-[88px]">
      <div className="feed flex flex-col items-center min-w-full sm:min-w-[480px] md:min-w-[680px] lg:min-w-[800px] lg:max-w-[800px]">
        <Suspense fallback={<span>loading feed...</span>}>
          {!postError ? (
            <div className="relative sm:min-w-[480px] md:min-w-[680px] lg:min-w-[800px]">
              <PinsController
                initialPosts={posts ?? undefined}
                session={session?.user.id as string}
              />
            </div>
          ) : (
            <h1>Feed Failed to load</h1>
          )}
        </Suspense>
      </div>
    </main>
  )
}
