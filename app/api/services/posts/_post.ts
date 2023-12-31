import { prisma } from '@/lib/database/prisma'
import { storeFile } from '@/lib/storage/actions'
import { Post } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

// export const config = { runtime: 'experimental-edge' }

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

export async function handlePost(
  authorId: string,
  req: Request,
): Promise<NextResponse> {
  try {
    const formData = await req.formData()

    const content = formData.get('content')?.toString()
    const postImages = formData.getAll('images') as File[] | null

    // REVIEW - Usage of buffers and base64
    // const bufferImages: Promise<Buffer>[] | undefined = postImages?.map(
    //   async (image: File): Promise<Buffer> =>
    //     Buffer.from(await image.arrayBuffer()),
    // )

    // const bytes = await postImages?.at(0)?.arrayBuffer()
    // // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // const buffer = Buffer.from(bytes!)

    if (!content) {
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
        postImages.map((image: File) =>
          storeFile(`posts/${authorId}/${image.name}`, image),
        ),
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
      revalidateTag('revalidate-feed')
      return NextResponse.json({ data: 'sent' }, { status: 200 })
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
