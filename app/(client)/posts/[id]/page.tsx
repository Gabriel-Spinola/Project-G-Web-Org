import React, { Suspense } from 'react'
import SelectedPostItem from './_components/SelectedPostItem'
import { fetchPost } from './_actions'
import Loader from '@/components/Loader'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import { Like, Pin } from '.prisma/client'

type Params = { params: { id: string } }

export default async function PostPage({ params }: Params) {
  const { id } = params

  const session = await getServerSession(AuthOptions)
  const { data, error } = await fetchPost(id)

  const isOwner = session?.user.id === data?.authorId

  const isLiked: boolean =
    data?.likes.some(
      (like: Partial<Like>) => like.userId === session?.user.id,
    ) ?? false

  const isPinned: boolean =
    data?.pins?.some((pin: Partial<Pin>) => pin.userId === session?.user.id) ??
    false

  return (
    <main className="mt-[88px] min-h-[calc(100vh-88px)] flex bg-darker-white items-center justify-center p-8">
      <section className="flex flex-col items-center min-w-full sm:min-w-[480px] md:min-w-[680px] lg:min-w-[800px] lg:max-w-[800px]">
        <Suspense fallback={<Loader />}>
          {!error && (
            <SelectedPostItem
              post={data}
              isOwner={isOwner}
              isLiked={isLiked}
              isPinned={isPinned}
            />
          )}
        </Suspense>
      </section>
    </main>
  )
}
