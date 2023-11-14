import { prisma } from '@/lib/database/prisma'
import { Project } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { APIResponse } from '../../_utils'

async function tryUpdateProject(
  newProject: Partial<Project>,
  projectId: string,
): Promise<Project | null> {
  try {
    const data = await prisma.project.update({
      where: { id: projectId },
      data: newProject,
    })

    revalidateTag('revalidate-feed')
    return data
  } catch (e: unknown) {
    console.warn(
      'SERVICES/CREATE-ProjectS::failed to create Project (database level): ',
      e,
    )

    return null
  }
}

export async function handlePatch(
  ProjectId: string,
  newProject: Partial<Project>,
): Promise<Promise<APIResponse<Project | string>>> {
  const data = await tryUpdateProject(newProject, ProjectId)

  return NextResponse.json({ data: data as Project }, { status: 200 })
}
