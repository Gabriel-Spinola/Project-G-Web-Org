import PostSubmitFragment from '../Posts/poster/PostSubmitFragment'
import PostItem from '../posts/PostItem'

export default function UserPosts() {
  return (
    <section id="PostWrapper" className="flex flex-col">
      <PostSubmitFragment />
      <PostItem post={null} />
      <PostItem post={null} />
    </section>
  )
}
