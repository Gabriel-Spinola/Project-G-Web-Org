'use client'

import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import React from 'react'

export default function DeletePostButton({ postId }: { postId: string }) {
  async function handlePostDeletion() {
    try {
      const response = await fetch(
        `${API_URL}${API_ENDPOINTS.services.posts}?id=${postId}`,
        {
          method: 'DELETE',
        },
      )

      const { data } = await response.json()

      if (!response.ok) {
        throw new Error('response not ok' + JSON.stringify(data))
      }

      console.log('data: ', data)
    } catch (error: unknown) {
      console.error(error)
    }
  }

  // TODO - Ask for confirmation before deleting the post
  return <button onClick={handlePostDeletion}>Delete Post</button>
}
