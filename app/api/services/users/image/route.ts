import { NextResponse } from 'next/server'
import handlePut from './_put'

async function handler(req: Request): Promise<NextResponse> {
  const url = new URL(req.url)
  const id: string | null = url.searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      {
        data: `FAILED:SERVICES/${req.method}-User::failed: id Can't be null`,
      },
      { status: 400 },
    )
  }

  if (req.method === 'PUT') {
    return handlePut(id, req)
  }

  return NextResponse.json(
    { data: { message: 'Invalid method' } },
    { status: 401 },
  )
}

export { handler as GET, handler as PUT }
