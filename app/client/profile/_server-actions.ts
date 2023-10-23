'use server'

import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { UserSelectedData } from './_actions'
import { prisma } from '@/lib/database/prisma'
import { ESResponse, UserData } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'

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
  'use server'

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
      return ESSucceed(true)
    }

    return ESSucceed(false)
  } catch (error: unknown) {
    return ESFailed(error)
  }
}

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

    console.log('Followed')
    return ESSucceed(newFollow.followerId)
  } catch (error: unknown) {
    console.error('Following Failed ' + error)

    return ESFailed(error)
  }
}

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

    console.log('Unffolowed')
    return ESSucceed(deletedFollow.count)
  } catch (error: unknown) {
    console.error('Unfollwing Failed ' + error)

    return ESFailed(error)
  }
}
