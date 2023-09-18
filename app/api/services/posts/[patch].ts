import { Post } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function handlePatch(
  id: string,
  newPostData: Partial<Post>,
): Promise<NextResponse> {
  return NextResponse.json({ data: 'aaa' })
}
