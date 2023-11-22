import { NextResponse } from 'next/server'
import { handleGet } from '../_get'

export async function GET(
  req: Request,
  { params }: { params: { page: string } },
) {
  const { data, error } = await handleGet(Number(params.page))

  if (error) {
    console.error(error)

    return NextResponse.json(
      { data: 'Failed to fetch projects' },
      { status: 500 },
    )
  }

  return NextResponse.json({ data }, { status: 200 })
}
