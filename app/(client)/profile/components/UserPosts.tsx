import { fetchPosts } from '@/app/(feed)/_actions'
import InfiniteScrollPosts from '../../../../components/posts/InfiniteScrollPosts'
import PostSubmitFragment from '../../../../components/posts/postSubmit/PostSubmitFragment'
import { ESResponse, FullPost } from '@/lib/types/common'
import NewPostModal from '@/components/posts/postSubmit/NewPostModal'
import { Suspense } from 'react'

type Params = {
  authorID: string
  isOwner: boolean
  currentUserId: string
}

export default async function UserPosts({
  authorID,
  isOwner,
  currentUserId,
}: Params) {
  const { data, error }: ESResponse<FullPost[]> = await fetchPosts(
    1,
    undefined,
    authorID,
  )

  return (
    <section id="PostWrapper" className="flex flex-col">
      {isOwner ? <PostSubmitFragment modal={<NewPostModal />} /> : undefined}

      {!error ? (
        <div className="flex flex-col justify-center">
          <InfiniteScrollPosts
            initialPublication={data ?? undefined}
            profileId={authorID}
            session={currentUserId}
          />
        </div>
      ) : (
        <span className="w-full text-center">Feed Failed to load</span>
      )}
    </section>
  )
}
