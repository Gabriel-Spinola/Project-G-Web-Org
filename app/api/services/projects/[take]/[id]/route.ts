import { NextResponse } from 'next/server'
import { handleGet } from '../../_get'

export async function handler(
  req: Request,
  { params }: { params: { take: string; id: string } },
) {
  const { data, error } = await handleGet(Number(params.take), params.id)

  if (error) {
    console.error(error)

    return NextResponse.json(
      { data: 'Failed to take projects' },
      { status: 500 },
    )
  }

  console.log(data?.length)

  return NextResponse.json({ data }, { status: 200 })
}

export { handler as GET }
