import { prisma } from '@/lib/database/prisma'
import { FileBody, StorageResponse } from '@/lib/storage/storage'
import { SUPABASE_PUBLIC_BUCKET_NAME, supabase } from '@/lib/storage/supabase'
import { Post } from '@prisma/client'
import { NextResponse } from 'next/server'

// export const config = { runtime: 'experimental-edge' }

async function storeImage(
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

async function createPost(
  newPost: Partial<Post>,
  imagesPaths: string[] | null = null,
): Promise<Post | null> {
  try {
    const postData: Post = await prisma.post.create({
      data: {
        content: newPost.content as string,
        images: imagesPaths ?? [],
        published: newPost.published as boolean,
        createdAt: newPost.createdAt as Date,
        authorId: newPost.authorId as string,
        updatedAt: newPost.updatedAt as Date,
      },
    })

    return postData
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
  try {
    const formData = await req.formData()

    const title = formData.get('title')?.toString()
    const content = formData.get('content')?.toString()
    const postImages = formData.getAll('images') as FileBody[] | null

    if (!checkRequiredFields(title, content, 'aa')) {
      return NextResponse.json(
        {
          data: 'Failed to create post: missing or invalid request data',
        },
        { status: 400 },
      )
    }

    const postData: Partial<Post> = {
      content,
      published: true,
      createdAt: new Date(Date.now()),
      authorId,
      updatedAt: new Date(Date.now()),
    }

    let data: Post | null = null

    if (postImages) {
      const storedImages = await Promise.all(
        postImages.map((image) => storeImage(authorId, image)),
      )

      if (storedImages.some((image) => !image)) {
        return NextResponse.json(
          { data: 'Failed to upload one or more images' },
          { status: 500 },
        )
      }

      data = await createPost(
        postData,
        storedImages.map((image) => {
          // NOTE - the image value is being checked above
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return image!.path
        }),
      )
    } else {
      data = await createPost(postData)
    }

    if (data) {
      return NextResponse.json({ data }, { status: 200 })
    }

    return NextResponse.json(
      {
        data: 'Failed to create post: missing or invalid request data',
      },
      { status: 400 },
    )
  } catch (error) {
    console.error('Error handling post:', error)

    return NextResponse.json({ data: 'Internal server error' }, { status: 500 })
  }
}
