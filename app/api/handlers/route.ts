import { prismaExport } from '@/lib/database/prisma'
import { Post } from '@/lib/database/table.types'
import { Exception } from '@prisma/client/runtime/library'
import { File } from 'buffer'
import { NextResponse } from 'next/server'

async function handler(req: Request) {
  const url = new URL(req.url) // Create a URL object from the request URL
  const queryParams = url.searchParams // Access the query parameters

  if (req.method === 'POST') {
    // Parse the form data
    const formData = await req.formData()

    // Access form field values
    const title = formData.get('title')
    const projectDescription = formData.get('project-description')
    const projectImgFile = formData.get('project-img'); // This will be a File object
    const projectImgName: string | undefined = projectImgFile instanceof File ? projectImgFile.name : 'noImage'

    if (projectImgFile != null && projectImgFile instanceof File) {
      console.log('Received File:', projectImgFile.name);
    }

    try {
      await prisma.project.create({
        data: { 
          title: title?.toString() || 'eorororor',
          description: projectDescription?.toString() || '',
          images: [projectImgName ?? 'noImage']
        },
      })
    } catch (e: any) {
      return NextResponse.json({message: `error sending data to database ${e}`}, {status: 200})
    }

    return NextResponse.json({
      message: title,
    })
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }
}

export { handler as GET, handler as POST }
