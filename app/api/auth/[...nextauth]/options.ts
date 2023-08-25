import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

// NOTE
// https://github.com/mikemajara/nextjs-prisma-next-auth-credentials/blob/main/pages/api/auth/%5B...nextauth%5D.ts

export const AuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Your Username',
        },
      },
      // Might be sending the wrong data ):
      async authorize(credentials, req) {
        const allUsers = await prisma.user.findMany()

        const userFound = allUsers.find(function (user) {
          // TODO: Add Cryptography
          return credentials?.username === user.name ? user : null
        })

        return userFound
      },
    }),
  ],
  adapter: PrismaAdapter(global.prisma),
  secret: process.env.NEXTAUTH_SECRET,
  //   Only for custom signin/login pages
  //   pages: {
  //     signIn: '/auth/signin',
  //   },
}
