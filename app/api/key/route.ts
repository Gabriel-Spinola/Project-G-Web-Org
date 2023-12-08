import { sign } from 'jsonwebtoken'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request) {
  try {
    const message = process.env.NEXTAUTH_SECRET as string
    const secretKey = process.env.DEC_KEY as string

    const jwtToken = sign({ data: message }, secretKey, { expiresIn: '30d' })

    return new Response(jwtToken, { status: 200 })
  } catch (error: unknown) {
    console.error(error)

    return new Response(null, { status: 500 })
  }
}
