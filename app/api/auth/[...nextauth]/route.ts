/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

// LINK: https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/#google_vignette
// LINK: https://github.com/mikemajara/nextjs-prisma-next-auth-credentials/blob/main/pages/api/auth/%5B...nextauth%5D.ts

import NextAuth from 'next-auth'
import { AuthOptions } from '@/lib/auth'

const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST }
