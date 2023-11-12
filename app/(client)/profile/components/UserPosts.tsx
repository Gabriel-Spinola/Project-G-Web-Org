import { fetchPosts } from '@/app/(feed)/_actions'
import InfiniteScrollPosts from '../../../../components/posts/InfiniteScrollPosts'
import PostSubmitFragment from '../../../../components/posts/postSubmit/PostSubmitFragment'
import { ESResponse, FullPost } from '@/lib/types/common'

type Params = {
  authorID: string
  isOwner: boolean
}

export default async function UserPosts({ authorID, isOwner }: Params) {
  const { data, error }: ESResponse<FullPost[]> = await fetchPosts(
    1,
    undefined,
    authorID,
  )

  return (
    <section id="PostWrapper" className="flex flex-col">
      {isOwner ? <PostSubmitFragment currentUserId={authorID} /> : undefined}

      {!error ? (
        <div className="flex flex-col justify-center">
          {data && data?.length > 0 ? (
            <InfiniteScrollPosts
              initialPublication={data}
              profileId={authorID}
            />
          ) : (
            <span className="w-full text-center">Oops você chegou ao fim!</span>
          )}
        </div>
      ) : (
        <span className="w-full text-center">Feed Failed to load</span>
      )}
    </section>
  )
}
