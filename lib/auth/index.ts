/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

import { prisma } from '@/lib/database/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { User } from '@prisma/client'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import { Credentials, validateCredentials } from './actions'
import { createTransport } from 'nodemailer'
import { text, html } from './mailerConf'

// NOTE - Enables and Disable all logs from next-ath
const debug = false

export const AuthOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development' && debug,
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
      async sendVerificationRequest(params) {
        const { identifier, url, provider } = params

        const newUrl =
          process.env.NODE_ENV === 'production'
            ? url.replace(
                'http://localhost:3000',
                'https://projectg2.vercel.app',
              )
            : url

        const { host } = new URL(newUrl)

        const transport = createTransport(provider.server)
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: text({ url: newUrl, host }),
          html: html({ url: newUrl, host }),
        })

        const failed = result.rejected.concat(result.pending).filter(Boolean)

        if (failed.length) {
          throw new Error(`Email (${failed.join(', ')}) could not be sent`)
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (debug) {
        console.debug('Session Callback ' + { session, token })
      }

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
      if (debug) {
        console.debug('JWT Callback', { token, user })
      }

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
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  // NOTE - logger disabled
  logger: {
    error: (code, metadata) => {
      if (!debug) {
        return
      }

      console.error('Auth Error:\n' + code, metadata)
    },
    warn: (code) => {
      if (!debug) {
        return
      }

      console.warn('Auth Warn:\n' + code)
    },
    debug: (code, metadata) => {
      if (!debug) {
        return
      }

      console.debug('Auth Debug:\n' + code, metadata)
    },
  },
  //   Only for custom signin/login pages
  pages: {
    signIn: '/login/',
  },
}
