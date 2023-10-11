import React from 'react'
import { DeleteCommentButton } from '../../temp/components/Buttons'
import { getComments, handleSubmitComment } from '../../temp/comments/actions'
import CreateCommentButton from '../../temp/components/CreateCommentButton'
import { Comment } from '@prisma/client'

type Props = {
  params: {
    id: string[]
  }
}

export default async function PostPage({ params }: Props) {
  const comments: Comment[] | null = await getComments()

  const authorId: string = params.id[0]
  const postId: string = params.id[1]

  return (
    <>
      <main>
        {authorId && postId ? (
          <>
            <form action={handleSubmitComment}>
              <input type="hidden" name="author-id" value={authorId} />
              <input type="hidden" name="target-id" value={postId} />

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
