import { prisma } from '@/lib/database/prisma'
import { SUPABASE_PUBLIC_BUCKET_NAME, supabase } from '@/lib/storage/supabase'
import { Post } from '@prisma/client'
import { NextResponse } from 'next/server'

// REVIEW - Need to make sure that the posts images are actually deleted after the post
export async function handleDelete(postId: string): Promise<NextResponse> {
  try {
    const deletedPost: Post = await prisma.post.delete({
      where: { id: postId },
    })

    if (deletedPost.images.length > 0) {
      const { data, error } = await supabase.storage
        .from(SUPABASE_PUBLIC_BUCKET_NAME)
        .remove(deletedPost.images.map((imagePath) => imagePath))

      if (error || data.length > 0) {
        throw error ?? 'Failed to delete some of the images' + data
      }
    }

    if (deletedPost) {
      return NextResponse.json({ data: deletedPost }, { status: 200 })
    }

    return NextResponse.json(
      {
        data: 'FAILED:SERVICES/DELETE-POST::failed to delete posts (API level)',
      },
      { status: 400 },
    )
  } catch (error: unknown) {
    console.error(
      'SERVICES/DELETE-POST::failed to get posts (database level):',
      error,
    )

    return NextResponse.json(
      {
        data: 'FAILED:SERVICES/DELETE-POST::failed to delete posts (API level)',
      },
      { status: 400 },
    )
  }
}
