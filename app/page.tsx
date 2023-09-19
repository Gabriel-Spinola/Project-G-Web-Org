// LINK: https://www.youtube.com/watch?v=ytkG7RT6SvU

import PostItem from '@/components/posts/PostItem'
import PostSubmitFragment from '@/components/Posts/poster/PostSubmitFragment'

export default async function Home() {
  return (
    <main className="flex min-h-screen justify-around flex-row bg-darker-white">
      <div className="feed flex flex-col items-center">
        <PostSubmitFragment></PostSubmitFragment>
        <PostItem post={null}></PostItem>
      </div>
    </main>
  )
}
