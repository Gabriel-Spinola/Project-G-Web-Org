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
