import { NextResponse } from 'next/server'
import { handlePost } from '../../posts/_post'

export function handler(req: Request, { params }: { params: { id: string } }) {
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
