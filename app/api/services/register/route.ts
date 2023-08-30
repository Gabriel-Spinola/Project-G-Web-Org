import { prisma } from '@/lib/database/prisma'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

type RegisterResponse = NextResponse<Record<string, any>>

async function handlePost(req: Request): Promise<RegisterResponse> {
  try {
    const formData = await req.formData()

    // Required in the form
    const name = formData.get('name')?.toString()
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()

    if (!name || !email || !password)
      throw new Error("Form fields can't be null")

    const hashedPassword = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    })

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    })
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: 'error',
        message: error,
      },
      { status: 500 },
    )
  }
}

export async function POST(req: Request): Promise<RegisterResponse> {
  if (req.method === 'POST') {
    return await handlePost(req)
  }

  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
}
