import { fetchPosts } from '@/app/(feed)/_actions'
import InfiniteScrollPosts from '../../../../components/posts/InfiniteScrollPosts'
import PostSubmitFragment from '../../../../components/posts/postSubmit/PostSubmitFragment'
import { ESResponse, FullPost } from '@/lib/types/common'
import { User } from '@prisma/client'

type Params = {
  authorID: string
  currentUserData?: Pick<User, 'id' | 'position'>
}

export default async function UserPosts({ authorID, currentUserData }: Params) {
  const { data, error }: ESResponse<FullPost[]> = await fetchPosts(
    1,
    undefined,
    authorID,
  )

  return (
    <section id="PostWrapper" className="flex flex-col">
      <PostSubmitFragment currentUserId={authorID} />

      {!error ? (
        <div className="flex flex-col justify-center">
          {data && data?.length > 0 ? (
            <InfiniteScrollPosts
              initialPublication={data}
              currentUserData={currentUserData}
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
