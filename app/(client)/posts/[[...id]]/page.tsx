import PostItem from '@/components/posts/PostItem'
import React from 'react'
import SelectedPostItem from './components/SelectedPostItem'

export default async function PostPage() {
  return (
    <main className="mt-[88px] h-[calc(100vh-88px)] bg-darker-white">
      <SelectedPostItem />
    </main>
  )
}
