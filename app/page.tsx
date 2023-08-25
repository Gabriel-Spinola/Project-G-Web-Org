import Image from 'next/image'

import Postbyuser from '@/components/posts/Post'
import Postbyuser2 from '@/components/posts/Post2'
import Postbyuser3 from '@/components/posts/Post3x'
import scssVariables from './styles/variables.module.scss'
import {prisma} from '@/lib/database/prisma'

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Postbyuser />
      <Postbyuser2 />
      <Postbyuser3 />
      {feedData.map((e) => e.author?.name)}
    </main>
  )
}
