import { ESResponse } from '@/lib/types/common'
import { ESFailed } from '@/lib/types/helpers'
import { NextResponse } from 'next/server'

async function updateUser(): Promise<ESResponse<string>> {
  
  
  return ESFailed('failed')
}

export default async function handlePut(req: Request) {
  const formData = await req.formData()

  const newImage = formData.get('image') as File | null

  if (!newImage) {
    return NextResponse.json(
      {
        data: 'Invalid request data',
      },
      { status: 400 },
    )
  }
  
  return NextResponse.json({ data: 'a' }, { status: 2000 })
}
