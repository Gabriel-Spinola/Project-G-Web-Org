import { Project } from '@prisma/client'
import { NextResponse } from 'next/server'
import { APIResponse } from '../../../_utils'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'
import { prisma } from '@/lib/database/prisma'

async function getProject(id: string): Promise<ESResponse<Project>> {
  try {
    const project: Project = await prisma.project.findUniqueOrThrow({
      where: { id },
    })

    return ESSucceed(project)
  } catch (error: unknown) {
    return ESFailed('Failed to get project: ' + id)
  }
}

export async function GET({
  params,
}: {
  params: { id: string }
}): Promise<APIResponse<Project | string>> {
  const { id } = params
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
