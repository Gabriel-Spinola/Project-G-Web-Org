'use server'

import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { UserSelectedData } from './_actions'
import { prisma } from '@/lib/database/prisma'
import { ESResponse, UserData } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'
import { revalidateTag } from 'next/cache'

/**
 * @author Gabriel Spinola
 *
 * @param id Id of the user as a string.
 * @param requestData the specific data from the user you want to request.
 * @returns the requested data from the user or, if failed, null.
 */
export async function getUserData(
  id: string,
  requestData: UserSelectedData,
): Promise<UserData | null> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.users}?id=${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.API_SECRET as string,
        },
        body: JSON.stringify(requestData),
        next: { tags: ['user-data'] },
      },
    )

    if (!response.ok) throw new Error('Response not ok')

    const { data }: { data: UserData } = await response.json()

    return data
  } catch (error: unknown) {
    console.error(error, 'Failed to fetch users')

    return null
  }
}

/**
 * @param authorId
 * @param targetId
 * @returns isFollowing
 */
export async function isFollowing(
  authorId: string,
  targetId: string,
): Promise<ESResponse<boolean>> {
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
): Promise<ESResponse<string>> {
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
): Promise<ESResponse<number>> {
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
