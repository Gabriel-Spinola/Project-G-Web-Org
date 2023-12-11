import { prisma } from '@/lib/database/prisma'
import { ESResponse, ProjectType } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'
import { Project } from '@prisma/client'
import { NextResponse } from 'next/server'
import { APIResponse } from '../../_utils'

async function getProject(id: string): Promise<ESResponse<ProjectType>> {
  try {
    const project: ProjectType = await prisma.project.findUniqueOrThrow({
      where: { id },
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

    return ESSucceed(project)
  } catch (error: unknown) {
    console.error(error)

    return ESFailed('Failed to get project: ' + id)
  }
}

export async function handleGet(
  id: string,
): Promise<APIResponse<Project | string>> {
  const { data, error } = await getProject(id)

  if (error || !data) {
    console.error(error)

    return NextResponse.json(
      { data: 'Failed to fetch project' },
      { status: 500 },
    )
  }

  return NextResponse.json({ data }, { status: 200 })
}
