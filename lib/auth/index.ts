/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/database/prisma'
import { Credentials, validateCredentials } from './actions'
import { User } from '@prisma/client'
import { API_ENDPOINTS, API_URL } from '../apiConfig'

/* NOTE
I added the randomKey to the configuration simply to demonstrate that any additional information can be included in the session. It doesn’t have a specific purpose or functionality within the code. Its purpose is solely to illustrate the flexibility of including custom data or variables in the session.
*/

export const AuthOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credentials) {
        const user: User | null = await validateCredentials(credentials)

        if (!user) {
          console.warn('AUTH_OPTIONS::Authorize: invalid user')

          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          position: user.position,
        }
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST as string,
        port: process.env.EMAIL_SERVER_PORT as string,
        auth: {
          user: process.env.EMAIL_SERVER_USER as string,
          pass: process.env.EMAIL_SERVER_PASSWORD as string,
        },
      },
      from: process.env.EMAIL_FROM as string,
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // NOTE: Debuggin
      console.debug('Session Callback ' + { session, token })

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          position: token.position,
        },
      }
    },
    jwt: ({ token, user }) => {
      // NOTE: Debuggin
      console.debug('JWT Callback', { token, user })

      if (user) {
        const $user = user as unknown as Partial<User>

        return {
          ...token,
          id: $user.id,
          position: $user.position,
        }
      }

      return token
    },
    async signIn({ user, account }) {
      const userExists = await prisma.user.findUnique({
        where: { email: user.email || '' },
      })

      if (!userExists && account?.provider === 'google') {
        const { name, email } = user

        console.log('LOG::creating user from google provider')

        try {
          const response = await fetch(
            `${API_URL}${API_ENDPOINTS.services.users}`,
            {
              method: 'POST',
              headers: {
                'X-API-Key': process.env.API_SECRET as string,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name,
                email,
              }),
            },
          )

          const { data } = await response.json()
          console.log(JSON.stringify(data))

          if (response.ok) {
            return true
          }

          throw new Error('Response not Okay')
        } catch (error: unknown) {
          console.error('LOG::failed to crete users ', error)

          return '/auth/'
        }
      }

      return userExists ? true : '/register'
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error: (code, metadata) => {
      console.error(code, metadata)
    },
    warn: (code) => {
      console.warn(code)
    },
    debug: (code, metadata) => {
      console.debug(code, metadata)
    },
  },
  //   Only for custom signin/login pages
  pages: {
    signIn: '/auth/',
  },
}
