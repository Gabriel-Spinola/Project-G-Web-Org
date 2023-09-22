import { prisma } from '@/lib/database/prisma'
import { SUPABASE_PUBLIC_BUCKET_NAME, supabase } from '@/lib/storage/supabase'
import { Post } from '@prisma/client'
import { assert } from 'console'
import { NextResponse } from 'next/server'

type StorageResponse = { path: string } | null
type FileBody = Blob | File

// function b64toBlob(b64Data: string, contentType='', sliceSize=512): Blob {

// }

// TODO: ADD UUID
async function storeImages(
  authorId: string,
  images: FileBody,
): Promise<StorageResponse> {
  try {
    // FIXME - failing at certain types of images
    const { data, error } = await supabase.storage
      .from(SUPABASE_PUBLIC_BUCKET_NAME)
      .upload(`posts/${authorId}/${images.name}`, images, {
        cacheControl: '3600',
        upsert: true, // NOTE - TEMP
      })

    if (error) {
      throw error
    }

    return data
  } catch (e: unknown) {
    console.error('failed at image storage ' + e)
    throw e
  }
}

// TODO: RECEIVE IMAGE
async function tryCreatePost(
  newPost: Partial<Post>,
  images: FileBody[] | null,
  authorId: string,
): Promise<Post | null> {
  const storedImages: StorageResponse[] = []

  try {
    if (images) {
      for (const image of images) {
        storedImages.push(await storeImages(authorId, image))
      }

      if (storedImages.length <= 0 || !storedImages) {
        throw new Error('failed to upload image')
      }
    }

    const userData = await prisma.post.create({
      data: {
        content: newPost.content as string,
        images: storedImages.map((image) => image?.path ?? '') ?? [],
        published: newPost.published as boolean,
        createdAt: newPost.createdAt as Date,
        authorId: newPost.authorId as string,
        updatedAt: newPost.updatedAt as Date,
      },
    })

    return userData
  } catch (e: unknown) {
    console.error(
      'SERVICES/CREATE-POSTS::failed to create post (database level): ',
      e,
    )

    return null
  }
}

// TODO: Add real requirements
function checkRequiredFields(
  title: string | null | undefined,
  content: string | null | undefined,
  images: string | null | undefined,
): boolean {
  return !!(title && content && images)
}

export async function handlePost(
  authorId: string,
  req: Request,
): Promise<NextResponse> {
  const formData = await req.formData()
  const title = formData.get('title')?.toString()
  const content = formData.get('content')?.toString()

  const projectImgFile = formData.getAll('image') as FileBody[] | null

  if (checkRequiredFields(title, content, 'aa')) {
    const data = await tryCreatePost(
      {
        content,
        published: true,
        createdAt: new Date(Date.now()),
        authorId,
        updatedAt: new Date(Date.now()),
      },
      projectImgFile,
      authorId,
    )

    // const data = 'test'

    if (data) {
      return NextResponse.json({ data }, { status: 200 })
    }

    return NextResponse.json(
      {
        data: 'FAILED:SERVICES/CREATE-POSTS::failed to create posts (API level): prisma response null',
      },
      { status: 400 },
    )
  }

  return NextResponse.json(
    {
      data: 'FAILED:SERVICES/CREATE-POSTS::failed to create post (API level): missing request data',
    },
    { status: 400 },
  )
}
