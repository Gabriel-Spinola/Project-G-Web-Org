import { NextResponse } from 'next/server'
import handlePost from '../_post'

async function handler(
  req: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse<Record<'data', unknown>>> {
  const { id } = params

  switch (req.method) {
    case 'POST':
      return handlePost(id, req)
    default:
      return NextResponse.json(
        { data: { message: 'Invalid method' } },
        { status: 401 },
      )
  }
}

export { handler as POST }
