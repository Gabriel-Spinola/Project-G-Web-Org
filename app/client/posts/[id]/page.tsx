import React from 'react'
import { DeleteCommentButton } from '../../temp/components/Buttons'
import { getComments, handleSubmitComment } from '../../temp/comments/actions'
import CreateCommentButton from '../../temp/components/CreateCommentButton'
import { Comment } from '@prisma/client'

type Props = {
  params: {
    id?: string
    currentUserId?: string
  }
}

export default async function PostPage({ params }: Props) {
  const comments: Comment[] | null = await getComments()

  return (
    <>
      <main>
        {params.currentUserId && params.id ? (
          <>
            <form action={handleSubmitComment}>
              <input type="hidden" name="author-id" value={params.id} />
              <input
                type="hidden"
                name="target-id"
                value={params.currentUserId}
              />

              <select name="type" id="type">
                <option value="posts">Posts</option>
              </select>

              <textarea
                name="content"
                id="content"
                cols={30}
                rows={10}
                required
              ></textarea>

              <CreateCommentButton />
            </form>

            <br />
            <br />

            <div>
              {comments?.map((comment) => (
                <>
                  <h1>Comment {comment.id.toString()}</h1>
                  <span>author: {comment.authorId}</span> <br />
                  <span>Content: {comment.content}</span> <br />
                  {/* <LikeButton
                    params={{
                      likes: 0,
                      authorId: params.currentUserId,
                      targetId: params.id as string,
                    }}
                  />{' '} */}
                  <DeleteCommentButton params={{ id: comment.id }} />
                  <br />
                  <br />
                  <br />
                  <hr />
                  <br />
                  <br />
                </>
              ))}
            </div>
          </>
        ) : (
          <h1>Auththtththth</h1>
        )}
      </main>
    </>
  )
}
