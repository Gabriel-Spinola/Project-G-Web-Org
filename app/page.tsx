// LINK: https://www.youtube.com/watch?v=ytkG7RT6SvU

import PostItem from '@/components/Posts/Post'
import PostSubmitFragment from '@/components/Poster/PostSubmitFragment'
import { prisma } from '@/lib/database/prisma'

export default async function Home() {
  const feedData = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  })

  return (
    <main className="flex min-h-screen justify-around flex-row pt-24 bg-darker-white">
      <div className="feed flex flex-col items-center">
        <PostSubmitFragment></PostSubmitFragment>
        <PostItem></PostItem>
        {/* {feedData.map((e) => e.author?.name)} */}
      </div>
    </main>
  )
}
