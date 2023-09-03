// LINK: https://www.youtube.com/watch?v=ytkG7RT6SvU

import PostItem from '@/components/Posts/Post'
import PostSubmitFragment from '@/components/Posts/poster/PostSubmitFragment'
import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { ModelsApiCode } from '@/lib/database/table.types'
import { Post, User } from '@prisma/client'

type PostResponse = { data: Array<Post> }
type PostAuthorData = Pick<User, 'name' | 'image' | 'graduations'>

export type FullPost = Post & PostAuthorData

async function getPostAuthorData(
  authorId: string,
): Promise<PostAuthorData | null> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.findUnique}?id=${authorId}&modelCode=${ModelsApiCode.User}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } },
    )

    if (response.ok) {
      const data: PostAuthorData = await response.json()

      return data
    }

    throw new Error('Network response was not OK')
  } catch (e: unknown) {
    console.error('failed to load author data ', e)

    return null
  }
}

async function getPosts(): Promise<Array<FullPost> | null> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.findMany}?modelCode=${ModelsApiCode.Post}`,
      { method: 'GET', headers: { 'Content-Type': 'application/json' } },
    )

    if (response.ok) {
      const { data }: PostResponse = await response.json()

      const fullPosts = data.map(async (post: Post) => {
        if (!post) return null

        const postAuthor: PostAuthorData | null = await getPostAuthorData(
          post.authorId as string,
        )

        return {
          ...post,
          name: postAuthor?.name as string | null,
          image: postAuthor?.image as string | null,
          graduations: postAuthor?.graduations as string[],
        }
      })

      return fullPosts
    }

    throw new Error('Network response was not OK')
  } catch (e: unknown) {
    console.error('failed to load posts', e)

    return null
  }
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
