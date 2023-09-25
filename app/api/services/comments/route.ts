import { prisma } from '@/lib/database/prisma'
import { Comment } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  if (req.method === 'GET') {
    try {
      const data: Comment[] = await prisma.comment.findMany()

      return NextResponse.json({ data }, { status: 200 })
    } catch (e: unknown) {
      console.error(e)

      return NextResponse.json({ data: 'invalid' }, { status: 301 })
    }
  }

  return NextResponse.json({ data: 'invalid' }, { status: 301 })
}
