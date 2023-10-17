import { fetchPosts } from '@/app/(feed)/_actions'
import PostHeader from '@/components/posts/PostHeader'
import { ESResponse } from '@/lib/types/common'
import React from 'react'

export default async function PostPage() {
  return (
    <main>
      <section id="postSection"></section>
      <section id="commentSection"></section>
    </main>
  )
}
