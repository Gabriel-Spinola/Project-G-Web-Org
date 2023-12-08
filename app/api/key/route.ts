import { Rabbit } from 'crypto-js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_req: Request) {
  try {
    const message = process.env.NEXTAUTH_SECRET as string
    const key = process.env.DEC_KEY as string

    const hash = Rabbit.encrypt(message, key).toString()

    return new Response(hash, { status: 200 })
  } catch (error: unknown) {
    return new Response(null, { status: 500 })
  }
}
