'use client'

import { commentsRefetchTag } from '@/app/client/temp/comments/contants'
import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { ESResponse, FullPost, PublicationComment } from '@/lib/types/common'
import React, { useCallback, useEffect, useRef, useState } from 'react'

async function fetchComments(
  postId: string,
  page?: number,
): Promise<ESResponse<PublicationComment[]>> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.comments}?id=${postId}&page=${
        page ?? 1
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: [commentsRefetchTag] },
      },
    )

    if (!response.ok) {
      throw new Error(JSON.stringify(await response.json()))
    }

    const { data }: { data: PublicationComment[] } = await response.json()

    return { data, error: null }
  } catch (error: unknown) {
    console.error(error)

    return { data: null, error }
  }
}

// FIXME - Use useRef to fix refetching problem
export default function PostCommentsSection({ post }: { post: FullPost }) {
  const [comments, setComments] = useState<PublicationComment[]>([])

  const [page, setPage] = useState(1)

  // const loadComments = useCallback(async () => {
  //   // const { data, error } = await fetchComments(postId, page)

  //   if (error || !data) {
  //     console.error(error)

  //     return
  //   }

  //   console.log(data)

  //   setComments((prevComment) => [
  //     ...prevComment,
  //     ...(data as PublicationComment[]),
  //   ])
  // }, [page, post])

  // useEffect(() => {
  //   loadComments()
  // }, [loadComments])

  return (
    <div>
      <h2>Comments</h2>

      {post &&
        post.comments.length > 0 &&
        post.comments.map((comment) => (
          <div key={comment.id}>
            <span>{post.author?.name}</span>

            <label htmlFor="content"></label>
            <textarea
              title="content"
              id="content"
              cols={30}
              rows={2}
              value={comment.content}
              readOnly
            ></textarea>
          </div>
        ))}

      <button
        type="button"
        onClick={() => {
          setPage(page + 1)
        }}
      >
        Carregar mais
      </button>
    </div>
  )
}
