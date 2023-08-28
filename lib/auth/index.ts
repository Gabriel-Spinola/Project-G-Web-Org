import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/database/prisma'

export const AuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'exemplo@exemplo.com',
        },
        password: { label: 'Senha', type: 'password' }
      },
      // Might be sending the wrong data ):
      async authorize(credentials) {
        const user = { id: "1", name: "Admin", email: "admin@admin.com" }

        return user
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  //   Only for custom signin/login pages
  //   pages: {
  //     signIn: '/auth/signin',
  //   },
}
