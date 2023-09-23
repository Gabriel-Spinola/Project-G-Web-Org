import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { AuthOptions } from '@/lib/auth'
import { prisma } from '@/lib/database/prisma'
import { Comment } from '@prisma/client'
import { Session, getServerSession } from 'next-auth'
import { revalidatePath, revalidateTag } from 'next/cache'
import React from 'react'

interface Params {
  params: { id: string }
}

const commentsRefetchTag = 'fetch-comments'

async function getComments(): Promise<Comment[] | null> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.comments}`,
      {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: [commentsRefetchTag] },
      },
    )

    if (!response.ok) {
      throw new Error(JSON.stringify(await response.json()))
    }

    const { data }: { data: Comment[] } = await response.json()

    console.log(JSON.stringify(data))
    return data
  } catch (e: unknown) {
    console.error(e)
    return null
  }
}

export default async function CommentForm({ params }: Params) {
  const session: Session | null = await getServerSession(AuthOptions)
  const comments: Comment[] | null = await getComments()

  async function handleSubmitComment(formData: FormData): Promise<void> {
    'use server'

    const content = formData.get('content')?.toString()
    const selectedType = formData.get('type')?.toString()

    if (!content || !session || !selectedType) return

    try {
      const data: Comment = await prisma.comment.create({
        data: {
          content,
          authorId: session?.user.id,
          postId: selectedType === 'posts' ? params.id : null,
          projectId: selectedType === 'projects' ? params.id : null,
          isEdited: false,
          createdAt: new Date(Date.now()),
        },
      })

      console.log('sucess' + JSON.stringify(data))
      revalidateTag(commentsRefetchTag)
    } catch (error: unknown) {
      console.error(error)
    }
  }

  return (
    <main>
      {session?.user ? (
        <>
          <form method="POST" action={handleSubmitComment}>
            <select name="type" id="type">
              <option value="posts">Posts</option>
              <option value="projects">Projects</option>
              <option value="None" selected>
                None
              </option>
            </select>

            <textarea
              name="content"
              id="content"
              cols={30}
              rows={10}
              required
            ></textarea>
            <input type="submit" value="submit" />
          </form>

          <br />
          <br />

          <div>
            {comments?.map((comment) => (
              <>
                <h1>Comment {comment.id.toString()}</h1>
                <span>author: {comment.authorId}</span> <br />
                <span>Content: {comment.content}</span> <br />
                <button>Likes</button> <br />
                <button>Dislike</button>
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
