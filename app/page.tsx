// LINK: https://www.youtube.com/watch?v=ytkG7RT6SvU

import PostSubmitFragment from '@/components/posts/poster/PostSubmitFragment'
import PostItem from '@/components/posts/PostItem'
import Routes from '@/components/Router'

export default async function Home() {
  return (
    <>
      <Routes />
      <main className="flex min-h-screen justify-around flex-row bg-darker-white">
        <div className="feed flex flex-col items-center">
          <PostSubmitFragment></PostSubmitFragment>
          <PostItem post={null}></PostItem>
        </div>
      </main>
    </>
  )
}
