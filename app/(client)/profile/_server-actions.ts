'use server'

import { prisma } from '@/lib/database/prisma'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'
import { revalidateTag } from 'next/cache'

/**
 * @param authorId
 * @param targetId
 * @returns isFollowing
 */
export async function isFollowing(
  authorId: string,
  targetId: string,
): Promise<ESResponse<boolean, unknown>> {
  try {
    const follow = await prisma.follows.findMany({
      where: {
        followerId: authorId,
        followingId: targetId,
      },
    })

    if (follow.length <= 0) {
      return ESSucceed(false)
    }

    return ESSucceed(true)
  } catch (error: unknown) {
    return ESFailed(error)
  }
}

/**
 * @default OnSuccess revalidates user data fetch
 * @param authorId
 * @param targetId
 * @returns if succeed return new follower id otherwise returns the error info
 */
export async function follow(
  authorId: string,
  targetId: string,
): Promise<ESResponse<string, unknown>> {
  try {
    const newFollow = await prisma.follows.create({
      data: {
        followerId: authorId,
        followingId: targetId,
      },
    })

    revalidateTag('user-data')
    return ESSucceed(newFollow.followerId)
  } catch (error: unknown) {
    console.error('Following Failed ' + error)

    return ESFailed(error)
  }
}

/**
 * @default OnSuccess revalidates user data fetch
 * @param authorId
 * @param targetId
 * @returns if succeed return new follower count otherwise returns the error info
 */
export async function unfollow(
  authorId: string,
  targetId: string,
): Promise<ESResponse<number, unknown>> {
  try {
    const deletedFollow = await prisma.follows.deleteMany({
      where: {
        followerId: authorId,
        followingId: targetId,
      },
    })

    if (deletedFollow.count <= 0) {
      throw new Error('Failed to unfollow')
    }

    revalidateTag('user-data')
    return ESSucceed(deletedFollow.count)
  } catch (error: unknown) {
    console.error('Unfollwing Failed ' + error)

    return ESFailed(error)
  }
}
