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

  // console.log(id)

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

  console.error(error)

  return (
    <main className="mt-[88px] h-[calc(100vh-88px)] bg-darker-white">
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
    </main>
  )
}
