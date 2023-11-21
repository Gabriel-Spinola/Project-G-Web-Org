import { NextResponse } from 'next/server'
import { handleGet } from '../_get'

export async function GET(
  req: Request,
  { params }: { params: { take: string } },
) {
  const { data, error } = await handleGet(Number(params.take))

  if (error) {
    console.error(error)

    return NextResponse.json(
      { data: 'Failed to take projects' },
      { status: 500 },
    )
  }

  return NextResponse.json({ data }, { status: 200 })
}
