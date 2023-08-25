import { prisma } from '@/lib/database/prisma'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

async function handler(req: Request) {
  const url = new URL(req.url) // Create a URL object from the request URL
  const queryParams = url.searchParams // Access the query parameters

  const id = queryParams.get('id')

  if (req.method === 'POST') {
    try {
      const data = await prisma.project.findUnique({ where: { id: id as string } })
			
      return NextResponse.json({ data })
    } catch (e: any) {
      // NOTE: Not going to production, may expose sensible data
      return NextResponse.json({ message: `Database bad request ${e}` }, { status: 400 })
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }
}

export { handler as GET, handler as POST }
