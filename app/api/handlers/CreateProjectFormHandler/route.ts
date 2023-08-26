import { prisma } from '@/lib/database/prisma'
import { File } from 'buffer'
import { NextResponse } from 'next/server'

async function handler(req: Request) {
  // Parse the form data
  const formData = await req.formData()

  // Access form field values
  const title = formData.get('title')
  const projectDescription = formData.get('project-description')
  const projectImgFile = formData.get('project-img'); // This will be a File object
  const projectImgName: string | undefined = projectImgFile instanceof File ? projectImgFile.name : 'noImage'

  if (req.method === 'POST') {
    try {
      await prisma.project.create({
        data: {
          title: title!.toString(),
          description: projectDescription?.toString() || '',
          images: [projectImgName ?? 'noImage'],
        },
      })

      return NextResponse.json({ message: `Successfully added` }, { status: 200 })
    } catch (e: any) {
      // NOTE: Not going to production, may expose sensible data
      return NextResponse.json({ message: `${e}` }, { status: 400 })
    }
  }

  if (req.method === 'PUT') {
    const url = new URL(req.url) // Create a URL object from the request URL
    const queryParams = url.searchParams // Access the query parameters

    const id = queryParams.get('id')

    if (id == null) return NextResponse.json({ message: `Id can't be null` }, { status: 400 })

    try {
      await prisma.project.update({
        where: { id: id.toString() },
        data: {
          title: title!.toString(),
          description: projectDescription?.toString() || '',
          images: [projectImgName ?? 'noImage'],
        },
      })

      return NextResponse.json({ message: `Successfully updated` }, { status: 200 })
    } catch (e: any) {
      // NOTE: Not going to production, may expose sensible data
      return NextResponse.json({ message: `${e}` }, { status: 400 })
    }
  }

  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
}

export { handler as PUT, handler as POST }
