import { prisma } from '@/lib/database/prisma'
import { storeFile } from '@/lib/storage/actions'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

async function updateUser(
  id: string,
  image: File,
): Promise<ESResponse<string>> {
  const storedImage = await storeFile(`profile-pic/${id}/${image.name}`, image)

  if (!storedImage) {
    return ESFailed('Failed to store the image')
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { profilePic: storedImage.path },
    })

    return ESSucceed(updatedUser.id)
  } catch (error: unknown) {
    return ESFailed('Failed to store the image')
  }
}

export default async function handlePut(id: string, req: Request) {
  const formData = await req.formData()

  const newImage = formData.get('display-images') as File | null

  if (!newImage) {
    return NextResponse.json(
      {
        data: 'Invalid request data',
      },
      { status: 400 },
    )
  }

  const { data, error } = await updateUser(id, newImage)

  if (error) {
    console.error(error)

    return NextResponse.json(
      { data: 'Failed to update user profile pic' },
      { status: 400 },
    )
  }

  revalidateTag('user-data')
  return NextResponse.json({ data }, { status: 200 })
}
