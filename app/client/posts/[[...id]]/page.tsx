import { fetchPosts } from '@/app/(feed)/_actions'
import PostHeader from '@/components/posts/PostHeader'
import { ESResponse } from '@/lib/types/common'
import React from 'react'

export default async function PostPage() {
  const { data, error }: ESResponse<Publication[]> = await fetchPosts(next)

  return (
    <main>
      <section id="postSection">
        <PostHeader post={} isOwner={false} />
      </section>
      <section id="commentSection"></section>
    </main>
  )
}
