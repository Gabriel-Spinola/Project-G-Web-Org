import { ESResponse, FullProject } from '@/lib/types/common'
import { prisma } from '@/lib/database/prisma'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'

export async function handleGet(
  take = 3,
  id?: string,
): Promise<ESResponse<FullProject[]>> {
  try {
    const data: FullProject[] = await prisma.project.findMany({
      where: id ? { authorId: id } : undefined,
      take,
      include: {
        author: {
          select: { name: true, image: true, profilePic: true },
        },
        contributor: { select: { name: true } },
        likes: { select: { id: true, userId: true } },
        comments: {
          include: {
            author: { select: { name: true, profilePic: true, image: true } },
            likes: { select: { id: true, userId: true } },
            replies: {
              include: {
                author: {
                  select: { name: true, profilePic: true, image: true },
                },
                likes: { select: { id: true, userId: true } },
              },
            },
          },
        },
      },
    })

    return ESSucceed(data)
  } catch (error: unknown) {
    return ESFailed(error)
  }
}
