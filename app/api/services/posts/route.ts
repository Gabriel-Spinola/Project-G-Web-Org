import { NextResponse } from 'next/server'
import { handleGet } from './_get'
import { handlePost } from './_post'
import { handleDelete } from './_delete'
import { handlePut } from './_put'
import { Post } from '@prisma/client'
import { handlePatch } from './_patch'

/**
 *
 * @param req Request
 * @param id works as authorID for: GET, POST, and, as postID for: PUT, DELETE
 * @returns API Response. Into `{ data: "response data" }` format
 *
 */
async function handler(req: Request): Promise<NextResponse> {
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

      return handleGet(take, id)
    }

    case 'POST': {
      return handlePost(id, req)
    }

    case 'PATCH': {
      const bodyData: Partial<Post> = await req.json()

      return handlePatch(id, bodyData)
    }

    // TODO: (accept only full posts)
    case 'PUT': {
      const bodyData: Post = await req.json()

      return handlePut(id, bodyData)
    }

    case 'DELETE': {
      return handleDelete(id)
    }

    default:
      return NextResponse.json(
        { data: { message: 'Invalid method' } },
        { status: 401 },
      )
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
