import Image from 'next/image'
import scssVariables from './styles/variables.module.scss'

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
      <h1>Hello, World!</h1>
      {feedData.map((e) => e.author?.name)}
    </main>
  )
}
