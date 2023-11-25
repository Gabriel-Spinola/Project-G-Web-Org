import { User } from '@prisma/client'
import { NextResponse } from 'next/server'
import handlePatch from './_patch'
import handleGet from './_get'

async function handler(
  req: Request,
): Promise<NextResponse<Record<'data', unknown>>> {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')?.toString()

  if (req.method === 'GET') {
    return handleGet()
  }

  // ANCHOR - Patch request **will not** handle image updating
  if (req.method === 'PATCH') {
    if (!id) {
      return NextResponse.json(
        {
          data: `FAILED:SERVICES/${req.method}-User: id Can't be null`,
        },
        { status: 400 },
      )
    }

    const newUserData: Partial<User> = await req.json()

    return handlePatch(id, newUserData)
  }

  return NextResponse.json(
    { data: { message: 'Invalid method' } },
    { status: 401 },
  )
}

export { handler as POST, handler as PATCH, handler as GET }
