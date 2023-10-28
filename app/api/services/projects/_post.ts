import { prisma } from '@/lib/database/prisma'
import { storeMultipleFiles } from '@/lib/storage/actions'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'
import { $Enums, Project } from '@prisma/client'
import { NextResponse } from 'next/server'

async function createNewProject(
  newProjectData: Partial<Project>,
): Promise<ESResponse<string, string>> {
  try {
    const newProject = await prisma.project.create({
      data: {
        title: newProjectData.title as string,
        description: newProjectData.description,
        images: newProjectData.images,
        files: newProjectData.files,
        projectType: newProjectData.projectType as $Enums.ProjectType,
        tags: newProjectData.tags,
        authorId: newProjectData.authorId,
      },
    })

    return ESSucceed(newProject.id)
  } catch (error: unknown) {
    console.error(error)

    return ESFailed('Failed to insert new project into DB ')
  }
}

export default async function handlePost(id: string, req: Request) {
  const formData = await req.formData()

  const projectTitle = formData.get('title')?.toString()
  const projectDescription = formData.get('description')?.toString() as
    | string
    | null
  const projectFiles = formData.getAll('files') as File[] | null
  const projectImages = formData.getAll('images') as File[] | null

  console.log(projectFiles)
  console.log(projectImages)

  if (!projectTitle) {
    return NextResponse.json(
      { data: 'Failed to create project: missing arguments ' },
      { status: 400 },
    )
  }

  if (projectImages && projectImages.length > 0) {
    const { error } = await storeMultipleFiles(
      `projects/${id}/images/`,
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
  if (projectFiles && projectFiles.length > 0) {
    const { error } = await storeMultipleFiles(
      `projects/${id}/files/`,
      projectFiles,
    )

    if (error) {
      console.error(error)

      return NextResponse.json(
        { data: 'Failed to upload one or more files' },
        { status: 500 },
      )
    }
  }

  const { data, error } = await createNewProject({
    title: projectTitle,
    description: projectDescription,
    images: projectImages?.map((file) => file.name) ?? [],
    files: projectFiles?.map((file) => file.name) ?? [],
    projectType: $Enums.ProjectType.Architecture,
    tags: [],
    authorId: id,
  })

  if (error) {
    console.error(error)

    return NextResponse.json(
      { data: 'something went wrong when creating new projec' },
      { status: 500 },
    )
  }

  return NextResponse.json({ data }, { status: 200 })
}
