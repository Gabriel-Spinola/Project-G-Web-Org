import type { GetStaticProps } from 'next'
import { DateTime } from 'next-auth/providers/kakao'

export type Post = {
  author: {
    name: string | null
  } | null
} & {
  id: string
  title: string
  content: string | null
  published: boolean
  authorId: string | null
}

export type User = {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
}
