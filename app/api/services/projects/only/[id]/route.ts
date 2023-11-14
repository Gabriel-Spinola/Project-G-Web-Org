import { NextResponse } from 'next/server'

import handlePost from '../_post'
import { handleDelete } from '../_delete'
import { handleGet } from '../_get'
import { handlePatch } from '../_patch'
import { Project } from '@prisma/client'

async function handler(
  req: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse<Record<'data', unknown>>> {
  const { id } = params

  switch (req.method) {
    case 'GET':
      return handleGet(id)
    case 'POST':
      return handlePost(id, req)
    case 'PATCH': {
      if (!id) {
        return NextResponse.json(
          {
            data: `FAILED:SERVICES/${req.method}-Post::failed: authorId Can't be null`,
          },
          { status: 400 },
        )
      }

      const bodyData: Partial<Project> = await req.json()

      return handlePatch(id, bodyData)
    }
    case 'DELETE':
      return handleDelete(id)
    default:
      return NextResponse.json(
        { data: { message: 'Invalid method' } },
        { status: 401 },
      )
  }
}

export { handler as POST, handler as GET, handler as DELETE, handler as PATCH }
