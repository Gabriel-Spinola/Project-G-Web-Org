import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from "bcryptjs";
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
        username: {
          label: 'Nome de Usuário',
          type: 'text',
          placeholder: 'Seu Nome',
        },
        email: {
          label: 'E-mail',
          type: 'email',
          placeholder: 'exemplo@exemplo.com',
        },
        password: { label: 'Senha', type: 'password' }
      },
      // Might be sending the wrong data ):
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password || !credentials.email) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        console.log('USER EMAIL: ' + user?.email)

        // using hashed password
        // if (!user || !(await compare(credentials.password, user.password!))) {
        //   console.log(`GETTING NULL ${credentials.password} != ${user?.password!}`)
        //   return null
        // }

        // No cryptography
        if (!user || credentials.password != user.password) {
          console.log(`GETTING NULL ${credentials.password} != ${user?.password!}`)
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: "Hey cool",
        }
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
