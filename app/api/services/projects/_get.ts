import { ESResponse, ProjectType } from '@/lib/types/common'
import { prisma } from '@/lib/database/prisma'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'

export async function handleGet(
  page = 1,
  id?: string,
  take = 3,
): Promise<ESResponse<ProjectType[]>> {
  const skip = (page - 1) * take

  try {
    const data: ProjectType[] = await prisma.project.findMany({
      where: id ? { authorId: id } : undefined,
      take,
      skip,
      include: {
        author: {
          select: { name: true, image: true, profilePic: true },
        },
        contributor: { select: { name: true } },
        likes: { select: { id: true, userId: true } },
        pins: { select: { id: true, userId: true } },
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
