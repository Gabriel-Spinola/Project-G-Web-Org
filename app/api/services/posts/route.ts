import { NextResponse } from 'next/server'
import { handleGet } from './[get]'
import { handlePost } from './[post]'
import { handleDelete } from './[delete]'
import { handlePut } from './[put]'
import { Post } from '@prisma/client'
import { handlePatch } from './[patch]'

// TODO: add middleware to security
// REVIEW Read please
// export const runtime = 'edge';

// const ratelimiter = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(5, '10 s'),
//   analytics: true,
// });

// export async function GET(req: NextRequest) {
//   // rate limit requests
//   const ip = req.headers.get('x-forwarded-for');
//   const { success } = await ratelimiter.limit(ip || 'api');
//   if (!success) {
//     return new NextResponse('Rate limit exceeded', { status: 429 });
//   }

//   const res = await fetch('https://9f5hpdsv6r8j.statuspage.io/api/v2/summary.json', {
//     next: { revalidate: 60 }, // Revalidate every 60 seconds
//     // headers: {
//     //   'Content-Type': 'application/json',
//     //   'API-Key': process.env.DATA_API_KEY,
//     // },
//   });

//   const data = await res.json();

//   return NextResponse.json({ data });
// }

/**
 *
 * @param req Requst
 * @param id work as authorID for: GET, POST
 * @returns API Response
 */
async function handler(req: Request): Promise<unknown | null> {
  const url = new URL(req.url)

  /**
   * - Works as authorID for: GET, POST
   * - Works as postID for: PUT, DELETE
   */
  const id: string | null = url.searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      {
        data: `FAILED:SERVICES/${req.method}-Post::failed: authorId Can't be null`,
      },
      { status: 400 },
    )
  }

  switch (req.method) {
    case 'GET': {
      const take: string | null = url.searchParams.get('take')

      return handleGet(req, take, id)
    }

    // REVIEW: (may using json bodies instead of formData works better)
    case 'POST': {
      const formData = await req.formData()

      return handlePost(id, formData)
    }

    // TODO: (accept partial posts)
    case 'PATCH': {
      const bodyData: Partial<Post> = await req.json()

      return handlePatch(id, bodyData)
    }

    // TODO: (accept only full posts)
    case 'PUT': {
      const bodyData: Post = await req.json()

      return handlePut(id, bodyData)
    }

    case 'DELETE': {
      return handleDelete(id)
    }

    default:
      return NextResponse.json(
        { data: { status: 'fail', message: 'Invalid method' } },
        { status: 401 },
      )
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
