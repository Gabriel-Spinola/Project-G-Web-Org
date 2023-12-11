import { prisma } from '@/lib/database/prisma'
import { Project } from '@prisma/client'
import { NextResponse } from 'next/server'
import { APIResponse } from '../../_utils'
import { storeMultipleFiles } from '@/lib/storage/actions'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'

async function updateProject(
  newProject: Partial<Project>,
  projectId: string,
): Promise<ESResponse<Project, string>> {
  try {
    const data = await prisma.project.update({
      where: { id: projectId },
      data: newProject,
    })

    // revalidateTag('revalidate-feed')
    return ESSucceed(data)
  } catch (error: unknown) {
    return ESFailed('Failed to update user' + JSON.stringify(error))
  }
}

export async function handlePatch(
  projectId: string,
  req: Request,
): Promise<Promise<APIResponse<Project | string>>> {
  const formData = await req.formData()

  const projectTitle = formData.get('title')?.toString()
  const projectDescription = formData.get('description')?.toString() as
    | string
    | null

  // NOTE - Filter is here for, iIf for some reason, any blob type file get into the api it'll be removed.
  const projectImages = (formData.getAll('images') as File[] | null)?.filter(
    (img) => img.type !== 'application/octet-stream',
  )

  console.log(projectImages)

  const newProject: Partial<Project> = {
    title: projectTitle,
    description: projectDescription,
    images: projectImages ? projectImages.map((image) => image.name) : [],
  }

  const { data, error } = await updateProject(newProject, projectId)
  if (error) {
    console.error(error)

    return NextResponse.json(
      { data: 'Failed to update user in database' },
      { status: 500 },
    )
  }

  if (projectImages && projectImages.length > 0) {
    const { error } = await storeMultipleFiles(
      `projects/${data?.authorId}/images/`,
      projectImages,
    )

    if (error) {
      console.error(error)

      return NextResponse.json(
        { data: 'Failed to upload one or more images' },
        { status: 500 },
      )
    }
  }

  return NextResponse.json({ data: data?.id as string }, { status: 200 })
}
