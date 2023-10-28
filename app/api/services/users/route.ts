import { User } from '@prisma/client'
import { NextResponse } from 'next/server'
import { handlePost, handlePostWithSelectedData } from './_post'
import handlePatch from './_patch'

type SelectedData = Record<keyof User, boolean>

async function handler(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')?.toString()

  if (req.method === 'POST') {
    if (id) {
      const reqData: SelectedData = await req.json()

      return handlePostWithSelectedData(id, reqData)
    }

    const reqData: Pick<User, 'email' | 'name'> = await req.json()

    return handlePost(reqData)
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
}

export { handler as POST, handler as PATCH }
