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

// TODO - add all paths that need authentication
const onlyAuthenticatedPages = [
  '/admin/',
  '/client/profile/',
  '/client/temp/',
  '/api/handlers/',
  '/api/session/',
]

// allowed requests per minute
const rateLimit = 100
const rateLimiter: Record<string, number[]> = {}

// NOTE: Not Scalable
function rateLimiterMiddleware(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - 60 * 1000 // 1 minute ago

  if (!rateLimiter[ip]) {
    rateLimiter[ip] = []
  }

  const requestTimestamps: number[] = rateLimiter[ip].filter(
    (timestamp) => timestamp > windowStart,
  )

  requestTimestamps.push(now)

  rateLimiter[ip] = requestTimestamps

  return requestTimestamps.length <= rateLimit
}

async function middleware(req: NextRequestWithAuth) {
  if (req.nextUrl.pathname.startsWith('/api/')) {
    // SECTION - Rate Limiter
    const ip =
      req.headers.get('x-forwarded-for') ||
      req.ip ||
      req.headers.get('x-real-ip')

    const passedRateLimiter = rateLimiterMiddleware(ip as string)

    if (!passedRateLimiter) {
      return NextResponse.json(
        { message: 'Rate limit exceeded' },
        { status: 429 },
      )
    }

    // REVIEW - Check if HEADER & OPTIONS method need a secret or not
    if (req.method !== 'GET') {
      const secret = req.nextUrl.searchParams.get('secret')

      if (secret !== (process.env.NEXTAUTH_SECRET as string)) {
        return NextResponse.json({ message: 'Invalid Secret' }, { status: 401 })
      }
    }

    // SECTION - Storage management
    // TODO: Storage Cleanup
  }

  const isEnteringOnAuthPage = onlyAuthenticatedPages.some(
    (pageUrl: string): boolean => req.nextUrl.pathname.startsWith(pageUrl),
  )

  if (isEnteringOnAuthPage) {
    return withAuth(req)
  }
}

export default middleware
