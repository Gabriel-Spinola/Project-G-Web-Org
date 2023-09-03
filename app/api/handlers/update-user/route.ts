// TODO: add data sanitization and stop exposing data into response bitch

import { prisma } from '@/lib/database/prisma'
import { NextResponse } from 'next/server'

async function handleUpdate(req: Request, id: string): Promise<NextResponse> {
  const formData = await req.formData()

  const title = formData.get('title')?.toString() ?? ''
  const description = formData.get('description')?.toString() ?? ''

  try {
    const databaseOperation = await prisma.user.update({
      where: { id },
      data: { title, description },
    })

    return NextResponse.json(
      {
        message: 'Successfully updated',
        operation:
          process.env.NODE_ENV === 'development'
            ? databaseOperation
            : { changed: { title, description } },
      },
      { status: 200 },
    )
  } catch (e: unknown) {
    return NextResponse.json({ message: e }, { status: 400 })
  }
}

export async function PUT(req: Request): Promise<NextResponse> {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  if (!id)
    return NextResponse.json({ message: `Id can't be null` }, { status: 400 })

  return handleUpdate(req, id)
}
