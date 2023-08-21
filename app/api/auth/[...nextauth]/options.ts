import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '@/lib/database/table.types'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const AuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(global.prisma),
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
      async authorize(credentials, req) {
        const allUsers: User[] = await prisma.user.findMany()

        const userFound = allUsers.find(function (user: User): User | null {
          // TODO: Add Cryptography
          return credentials?.username === user.name ? user : null
        })

        return userFound
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  //   Only for custom signin/login pages
  //   pages: {
  //     signIn: '/auth/signin',
  //   },
}
