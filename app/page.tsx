/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

// LINK: https://www.youtube.com/watch?v=ytkG7RT6SvU

import PostItem from '@/components/Posts/Post'
import PostSubmitFragment from '@/components/Posts/poster/PostSubmitFragment'
import { Post, User } from '@prisma/client'

type PostResponse = { data: Array<Post> }
type PostAuthorData = Pick<User, 'name' | 'image' | 'graduations'>

export type FullPost = Post & PostAuthorData

async function getPosts(): Promise<Array<FullPost> | null> {
  return null
}

export default async function Home() {
  const posts: Post[] | null = await getPosts()

  return (
    <main className="flex min-h-screen justify-around flex-row pt-24 bg-darker-white">
      <div className="feed flex flex-col items-center">
        <PostSubmitFragment></PostSubmitFragment>

        {posts?.map((post: Post, index: number) => (
          <PostItem post={post} key={index} />
        ))}
      </div>
    </main>
  )
}
