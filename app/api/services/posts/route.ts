import { NextResponse } from 'next/server'
import { handleGet } from './[get]'
import { handlePost } from './[post]'
import { handleDelete } from './[delete]'
import { handlePut } from './[put]'
import { Post } from '@prisma/client'

async function handler(req: Request): Promise<unknown | null> {
  const url = new URL(req.url)

  /**
   * - Works as authorID for: GET, POST
   * - Works as postID for: PUT, DELETE
   */
  const id: string | null = url.searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      {
        data: `FAILED:SERVICES/${req.method}-Post::failed: authorId Can't be null`,
      },
      { status: 400 },
    )
  }

  switch (req.method) {
    case 'GET': {
      const take: string | null = url.searchParams.get('take')

      return handleGet(req, take, id)
    }

    // REVIEW: (may using json bodies instead of formData works better)
    case 'POST': {
      const formData = await req.formData()

      return handlePost(id, formData)
    }

    // REVIEW: (maybe patch?)
    case 'PUT': {
      const bodyData: Partial<Post> = await req.json()

      return handlePut(id, bodyData)
    }

    case 'DELETE': {
      return handleDelete(id)
    }

    default:
      return NextResponse.json(
        { data: { status: 'fail', message: 'Invalid method' } },
        { status: 401 },
      )
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
