/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import 'next-auth'

// ANCHOR Add into the existing interfaces in the next-auth
declare module 'next-auth' {
  interface User {
    description?: string
    title?: string
    siteUrl?: string
    linkedinUrl?: string
    contactPhone?: string
  }

  interface Session {
    user: User
  }
}
