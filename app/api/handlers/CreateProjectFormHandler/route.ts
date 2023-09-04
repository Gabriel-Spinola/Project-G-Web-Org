/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import { prisma } from '@/lib/database/prisma'
import { NextResponse } from 'next/server'

async function tryResponse(
  databaseOperation: Promise<unknown>,
  successMessage: string,
): Promise<NextResponse> {
  try {
    await databaseOperation
    return NextResponse.json({ message: successMessage }, { status: 200 })
  } catch (e: unknown) {
    // NOTE: Not going to production, may expose sensitive data
    return NextResponse.json({ message: `${e}` }, { status: 400 })
  }
}

async function handleCreateOrUpdate(
  req: Request,
  id: string | null,
  successMessage: string,
  update = false,
): Promise<NextResponse> {
  const formData = await req.formData()
  const title = formData.get('title')
  const projectDescription = formData.get('project-description')

  // LINK: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_multiple_files
  const projectImgFile = formData.get('project-img')
  const projectImgName =
    projectImgFile instanceof File ? projectImgFile.name : 'noImage'

  const data = {
    title: title?.toString() || '',
    description: projectDescription?.toString() || '',
    images: [projectImgName],
  }

  // FIXME eslint ):
  const databaseOperation = update
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      prisma.project.update({ where: { id: id! }, data })
    : prisma.project.create({ data })

  return tryResponse(databaseOperation, successMessage)
}

async function handler(req: Request): Promise<NextResponse> {
  if (req.method === 'POST') {
    return handleCreateOrUpdate(req, null, 'Successfully added')
  }

  if (req.method === 'PUT') {
    const url = new URL(req.url)
    const queryParams = url.searchParams
    const id = queryParams.get('id')

    if (!id)
      return NextResponse.json({ message: `Id can't be null` }, { status: 400 })

    return handleCreateOrUpdate(req, id, 'Successfully updated', true)
  }

  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
}

export { handler as PUT, handler as POST }
