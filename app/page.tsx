// https://www.youtube.com/watch?v=PGPGcKBpAk8

import Postbyuser from '@/components/Posts/Post'
import Poster from '@/components/Poster/Poster'

export default async function Home() {
  return (
    <main className="flex min-h-screen justify-around flex-row pt-24 bg-darker-white">
      <div className="feed flex flex-col items-center">
        <Poster></Poster>
        <Postbyuser></Postbyuser>
        {/* {feedData.map((e) => e.author?.name)} */}
      </div>
    </main>
  )
}
