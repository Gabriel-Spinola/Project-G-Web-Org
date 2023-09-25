/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */


import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
// import { get, set } from 'lodash'

// NOTE: Not Scalable

// allowed requests per minute
const rateLimit = 40
const rateLimiter = {}

// FIXME - Dynamic Code Evaluation (e. g. 'eval', 'new Function', 'WebAssembly.compile') not allowed in Edge Runtime
// LINK - Learn More: https://nextjs.org/docs/messages/edge-dynamic-code-evaluation
// function rateLimiterMiddleware(ip: string) {
//   const now = Date.now()
//   const windowStart = now - 60 * 1000 // 1 minute ago

//   const requestTimestamps: number[] = get(rateLimiter, ip, []).filter(
//     (timestamp) => timestamp > windowStart,
//   )

//   requestTimestamps.push(now)

//   set(rateLimiter, ip, requestTimestamps)

//   return requestTimestamps.length <= rateLimit
// }

async function middleware(req: NextRequestWithAuth) {
  if (req.nextUrl.pathname.startsWith('/api/')) {
    // SECTION - Rate Limiter
    const ip =
      req.headers.get('x-forwarded-for') ||
      req.ip ||
      req.headers.get('x-real-ip')

    // FIXME
    // const passedRateLimiter = rateLimiterMiddleware(ip as string)
    const passedRateLimiter = true

    if (!passedRateLimiter) {
      return NextResponse.json(
        { message: 'Rate limit exceeded' },
        { status: 429 },
      )
    }

    // SECTION - Storage management
    // TODO: Storage Cleanup
  }

  // TODO - add paths that need authentication
  if (req.nextUrl.pathname.startsWith('/admin/')) {
    return withAuth(req)
  }
}

export default middleware
