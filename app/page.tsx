import Image from 'next/image'

// https://www.youtube.com/watch?v=PGPGcKBpAk8

import Postbyuser from '@/components/Posts/Post'
import Poster from '@/components/Poster/Poster'
import scssVariables from './styles/variables.module.scss'
import { prisma } from '@/lib/database/prisma'
import Component from '@/components/Poster/test'

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
        <Poster></Poster>
        <Postbyuser></Postbyuser>
        {/* {feedData.map((e) => e.author?.name)} */}
      </div>
    </main>
  )
}
