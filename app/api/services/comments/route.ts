import { prisma } from '@/lib/database/prisma'
import { Comment } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  if (req.method === 'GET') {
    const data: Comment[] = await prisma.comment.findMany()

    return NextResponse.json({ data }, { status: 200 })
  }
}
