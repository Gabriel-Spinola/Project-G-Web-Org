// LINK: https://github.com/nextauthjs/next-auth-example/blob/main/pages/api/examples/protected.ts

import NextAuth from 'next-auth'
import { AuthOptions } from './options'

const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST }
