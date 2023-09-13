/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

// LINK: https://www.youtube.com/watch?v=ytkG7RT6SvU

import PostItem from '@/components/posts/PostItem'
import PostSubmitFragment from '@/components/posts/poster/PostSubmitFragment'
import { Post, User } from '@prisma/client'

type PostResponse = { data: Array<Post> }
type PostAuthorData = Pick<User, 'name' | 'image' | 'graduations'>

export type FullPost = Post & PostAuthorData

export default async function Home() {
  return (
    <div className="feed flex flex-col items-center">
      <PostSubmitFragment></PostSubmitFragment>
      {/* {posts?.map((post: Post, index: number) => (
        <PostItem post={post} key={index} />
      ))} */}

      <PostItem post={null} />
      <PostItem post={null} />
    </div>
  )
}
