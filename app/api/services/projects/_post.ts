import { NextResponse } from 'next/server'

export default function handlePost(id: string, req: Request) {
  return NextResponse.json({ data: 'post' }, { status: 200 })
}
