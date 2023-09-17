import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { get, set } from 'lodash'

// NOTE: Not Scalable

// allowed requests per minute
const rateLimit = 12
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
  const ip =
    req.headers.get('x-forwarded-for') || req.ip || req.headers.get('x-real-ip')

  const passedRateLimiter = rateLimiterMiddleware(ip as string)

  if (!passedRateLimiter) {
    return NextResponse.json(
      { message: 'Rate limit exceeded' },
      { status: 429 },
    )
  }

  if (req.nextUrl.pathname.startsWith('/api/session')) {
    return withAuth(req)
  }
}

export default middleware
