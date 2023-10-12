import { postComment } from '@/app/(feed)/_serverActions'
import { deleteComment } from '@/app/client/temp/comments/actions'
import { commentsRefetchTag } from '@/app/client/temp/comments/contants'
import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { ESResponse, FullPost, PublicationComment } from '@/lib/types/common'
import CreateCommentButton from '@/app/client/temp/components/CreateCommentButton'
import React from 'react'

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

// TODO - Create temp comment array to create the illusion of creating and deleting comments
// while the data is still being processes
export default function PostCommentsSection({ post }: { post: FullPost }) {
  const tempComments = post.comments

  return (
    <div>
      <form action={postComment}>
        <input type="hidden" name="author-id" value={post.authorId as string} />
        <input type="hidden" name="target-id" value={post.id} />

        <label htmlFor="content"></label>
        <textarea
          name="content"
          title="content"
          id="contentk"
          cols={30}
          rows={3}
          placeholder="Faça seu comentário"
        ></textarea>

        <CreateCommentButton />
      </form>

      <hr />

      <h2>Comments</h2>

      {post.comments.length > 0 &&
        post.comments.map((comment) => (
          <div key={comment.id}>
            <button
              type="button"
              onClick={async () => {
                await deleteComment(comment.id)

                post.comments.pop()
              }}
            >
              delete
            </button>
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
    </div>
  )
}
