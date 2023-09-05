import { NextResponse } from 'next/server'
import { handleGet } from './[get]'
import { handlePost } from './[post]'
import { handleDelete } from './[delete]'

async function handler(req: Request) {
  const url = new URL(req.url)

  const authorId: string | null = url.searchParams.get('authorId')

  switch (req.method) {
    case 'GET': {
      const take: string | null = url.searchParams.get('take')

      return handleGet(req, take, authorId)
    }

    // TODO: Test Post kkkkk
    case 'POST': {
      if (!authorId)
        return NextResponse.json(
          {
            data: "FAILED:SERVICES/CREATE-POSTS::failed to create posts (API level): authorId Can't be null",
          },
          { status: 400 },
        )

      const formData = await req.formData()

      return handlePost(req, authorId, formData)
    }

    case 'PUT':
      return handleGet(req)

    case 'DELETE': {
      const postId: string | null = url.searchParams.get('postId')

      if (!postId) {
        return NextResponse.json(
          {
            data: "FAILED:SERVICES/DELETE-POST::failed to delete posts (API level): postId Can't be null",
          },
          { status: 400 },
        )
      }

      return handleDelete(postId)
    }

    default:
      return NextResponse.json(
        { data: { status: 'fail', message: 'Invalid method' } },
        { status: 401 },
      )
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
