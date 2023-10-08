import { AuthOptions } from '@/lib/auth'
import { Comment } from '@prisma/client'
import { Session, getServerSession } from 'next-auth'
import React from 'react'
import { getComments, handleSubmitComment } from '../actions'
import CreateCommentButton from '../../components/CreateCommentButton'
import { LikeButton, DeleteCommentButton } from '../../components/Buttons'

interface Params {
  params: { id: string }
}

// TODO: Add likes with useOptimistic hook
export default async function CommentForm({ params }: Params) {
  const session: Session | null = await getServerSession(AuthOptions)
  const comments: Comment[] | null = await getComments()

  return (
    <main>
      {session?.user ? (
        <>
          <form action={handleSubmitComment}>
            <input type="hidden" name="author-id" value={session.user.id} />
            <input type="hidden" name="target-id" value={params.id} />

            <select name="type" id="type">
              <option value="posts">Posts</option>
              <option value="projects">Projects</option>
              <option value="None">None</option>
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
                <LikeButton
                  params={{ likes: 0, session, targetId: params.id }}
                />{' '}
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
  )
}
