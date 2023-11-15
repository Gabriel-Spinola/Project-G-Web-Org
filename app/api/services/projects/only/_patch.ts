import { prisma } from '@/lib/database/prisma'
import { Project } from '@prisma/client'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { APIResponse } from '../../_utils'
import { storeMultipleFiles } from '@/lib/storage/actions'

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
  } catch (error: unknown) {
    console.warn(
      'SERVICES/CREATE-ProjectS::failed to create Project (database level): ',
      error,
    )

    return null
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
  const projectImages = (formData.getAll('images') as File[] | null)?.filter(
    (img) => {
      if (img.type !== 'application/octet-stream') {
        return img
      }
      console.log('failed at: ' + img.name + ' ' + img.type)
      return null
    },
  )

  console.log(projectImages)

  const newProject: Partial<Project> = {
    title: projectTitle,
    description: projectDescription,
    images: projectImages ? projectImages.map((image) => image.name) : [],
  }

  const data = await tryUpdateProject(newProject, projectId)

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

  return NextResponse.json({ data: data as Project }, { status: 200 })
}
