import Image from 'next/image'
import scssVariables from './styles/variables.module.scss'
import prisma from '@/lib/prisma'

console.log(scssVariables.primaryColor)

const getStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  })

  return feed
}

export default async function Home() {
  const data = await getStaticProps()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello, World!</h1>
      <h1>{data.map((e) => e.title)}</h1>
    </main>
  )
}
