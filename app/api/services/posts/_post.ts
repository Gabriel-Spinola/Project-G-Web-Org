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

// TODO: RECEIVE IMAGE
async function tryCreatePost(newPost: Partial<Post>): Promise<Post | null> {
  try {
    const data = await prisma.post.create({
      data: {
        content: newPost.content as string,
        images: newPost.images as string[],
        published: newPost.published as boolean,
        createdAt: newPost.createdAt as Date,
        authorId: newPost.authorId as string,
        updatedAt: newPost.updatedAt as Date,
      },
    })

    supabase.storage
      .from(SUPABASE_PUBLIC_BUCKET_NAME)
      .upload(getPostUrl(data.id, '00'))

    return data
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
  images: string[] | null | undefined,
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
  const projectImgName =
    projectImgFile instanceof File ? projectImgFile.name : 'noImage'
  const imgUrl = getProfilePicURL(authorId, '0')

  if (checkRequiredFields(title, content, [imgUrl])) {
    const data = await tryCreatePost({
      content,
      published: true,
      createdAt: new Date(Date.now()),
      images: [imgUrl],
      authorId,
      updatedAt: new Date(Date.now()),
    })

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
