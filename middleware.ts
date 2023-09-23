import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { get, set } from 'lodash'

// NOTE: Not Scalable

// allowed requests per minute
const rateLimit = 40
const rateLimiter = {}

function rateLimiterMiddleware(ip: string) {
  const now = Date.now()
  const windowStart = now - 60 * 1000 // 1 minute ago

  const requestTimestamps: number[] = get(rateLimiter, ip, []).filter(
    (timestamp) => timestamp > windowStart,
  )

  requestTimestamps.push(now)

  set(rateLimiter, ip, requestTimestamps)

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

    // SECTION - Storage management
    // TODO: Storage Cleanup
  }

  if (req.nextUrl.pathname.startsWith('/admin/')) {
    return withAuth(req)
  }
}

export default middleware
