import { prisma } from '@/lib/database/prisma'
import { Post } from '@prisma/client'
import { NextResponse } from 'next/server'

async function tryCreatePost(newPost: Partial<Post>): Promise<Post | null> {
  try {
    const data = await prisma.post.create({
      data: {
        title: newPost.title as string,
        content: newPost.content as string,
        published: newPost.published as boolean,
        createdAt: newPost.createdAt as Date,
        authorId: newPost.authorId as string,
        updatedAt: newPost.updatedAt as Date,
      },
    })

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

  if (checkRequiredFields(title, content, [projectImgName])) {
    const data = await tryCreatePost({
      title,
      content,
      published: true,
      createdAt: new Date(Date.now()),
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
