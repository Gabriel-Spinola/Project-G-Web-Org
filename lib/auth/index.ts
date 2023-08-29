import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from "bcryptjs";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/database/prisma'

/*NOTE
I added the randomKey to the configuration simply to demonstrate that any additional information can be included in the session. It doesn’t have a specific purpose or functionality within the code. Its purpose is solely to illustrate the flexibility of including custom data or variables in the session.
*/

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
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      // Might be sending the wrong data ):
      async authorize(credentials) {
        if (!credentials?.password || !credentials?.email) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        console.log('USER EMAIL: ' + user?.email)

        // using hashed password
        if (!user || !(await compare(credentials.password, user.password!))) {
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
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback ' + { session, token })

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        }
      }
    },
    jwt: ({ token, user }) => {
      console.log("JWT Callback", { token, user });

      if (user) {
        const $user = user as unknown as any

        return {
          ...token,
          id: $user.id,
          randomKey: $user.randomKey,
        }
      }

      return token
    }
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  //   Only for custom signin/login pages
  //   pages: {
  //     signIn: '/auth/signin',
  //   },
}
