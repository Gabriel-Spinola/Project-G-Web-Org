import Image from 'next/image'
import Postbyuser from '@/components/Posts/Post'
import Postbyuser2 from '@/components/Posts/Post2'
import Postbyuser3 from '@/components/Posts/Post3x'
import scssVariables from './styles/variables.module.scss'
import prisma from '@/lib/database/prisma'
import { Post } from '@/lib/database/table.types'

export default async function Home() {
  const feedData: Post[] = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  })

  const userData = await prisma.user.findMany({
    where: { name: 'a' },
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
