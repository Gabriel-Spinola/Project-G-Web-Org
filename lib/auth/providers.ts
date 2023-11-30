/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import { Credentials, validateCredentials } from './actions'
import { User } from '@prisma/client'

/* NOTE
I added the randomKey to the configuration simply to demonstrate that any additional information can be included in the session. It doesn’t have a specific purpose or functionality within the code. Its purpose is solely to illustrate the flexibility of including custom data or variables in the session.
*/

const GoogleAuth = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
})

const CustomCredentialsProvider = CredentialsProvider({
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

    const token = generateJwtToken(user)

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    }
  },
})

const ForgotEmailProvider = EmailProvider({
  server: {
    host: process.env.EMAIL_SERVER_HOST as string,
    port: process.env.EMAIL_SERVER_PORT as string,
    auth: {
      user: process.env.EMAIL_SERVER_USER as string,
      pass: process.env.EMAIL_SERVER_PASSWORD as string,
    },
  },
  from: process.env.EMAIL_FROM as string,
})

const customProviders = [
  CustomCredentialsProvider,
  GoogleAuth,
  ForgotEmailProvider,
]
export default customProviders
