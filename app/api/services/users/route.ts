import { User } from '@prisma/client'
import { NextResponse } from 'next/server'
import { handleGet } from './_get'
import { handlePost } from './_post'

type SelectedData = Record<keyof User, boolean>

async function handler(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')?.toString()

  if (req.method === 'POST') {
    if (id) {
      const reqData: SelectedData = await req.json()

      return handleGet(id, reqData)
    }

    const reqData: Pick<User, 'email' | 'name'> = await req.json()

    return handlePost(reqData)
  }
}

export { handler as POST }
