import Image from 'next/image'

import Postbyuser from '@/components/Posts/Post'
import Poster from '@/components/Posts/poster'
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
    <main className="flex min-h-screen justify-around flex-row pt-24 bg-darker-white">
      <div className='feed flex flex-col items-center'>
        <a href='#' className='m-8'><Poster/></a>
        <Postbyuser />
        {feedData.map((e) => e.author?.name)}
      </div>
    </main>
  )
}
