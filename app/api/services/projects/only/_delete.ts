import { NextResponse } from 'next/server'
import { Project } from '@prisma/client'
import { prisma } from '@/lib/database/prisma'
import { APIResponse } from '../../_utils'

export async function handleDelete(
  id: string,
): Promise<APIResponse<Project[] | string>> {
  try {
    const deleteProject = await prisma.project.delete({ where: { id } })

    console.log('deletion succeeded')

    return NextResponse.json(
      { data: 'Deleted: ' + deleteProject.id },
      { status: 200 },
    )
  } catch (error: unknown) {
    console.error(error)

    return NextResponse.json({ data: 'Failed' }, { status: 500 })
  }
}
