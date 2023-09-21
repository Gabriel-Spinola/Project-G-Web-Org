import { prisma } from '@/lib/database/prisma'
import {
  SUPABASE_PUBLIC_BUCKET_NAME,
  getPostUrl,
  getProfilePicURL,
  supabase,
} from '@/lib/storage/supabase'
import { Post } from '@prisma/client'
import { random } from 'lodash'
import { NextResponse } from 'next/server'

type StorageResponse = { path: string } | null

// TODO: ADD UUID
async function storeImages(
  authorId: string,
  images: File,
): Promise<StorageResponse> {
  const { data, error } = await supabase.storage
    .from(SUPABASE_PUBLIC_BUCKET_NAME)
    .upload(`posts/${authorId}/${images.name}`, images, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw error
  }

  return data
}

// TODO: RECEIVE IMAGE
async function tryCreatePost(
  newPost: Partial<Post>,
  img: File | null,
  authorId: string,
): Promise<Post | null> {
  let imagePath: StorageResponse = null

  try {
    if (img) {
      imagePath = await storeImages(authorId, img)

      if (!imagePath) {
        throw new Error('failed to upload image')
      }
    }

    console.log(imagePath?.path)

    const userData = await prisma.post.create({
      data: {
        content: newPost.content as string,
        images: ['bro im text'],
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
  formData: FormData,
): Promise<NextResponse> {
  const title = formData.get('title')?.toString()
  const content = formData.get('content')?.toString()

  const projectImgFile = formData.get('image')
  const projectImg = projectImgFile instanceof File ? projectImgFile : null

  if (checkRequiredFields(title, content, 'aa')) {
    const data = await tryCreatePost(
      {
        content,
        published: true,
        createdAt: new Date(Date.now()),
        authorId,
        updatedAt: new Date(Date.now()),
      },
      projectImg,
      authorId,
    )

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
