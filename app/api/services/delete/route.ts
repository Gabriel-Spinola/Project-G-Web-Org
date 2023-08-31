import { prisma } from '@/lib/database/prisma'
import { ModelsApiCode } from '@/lib/database/table.types'
import { NextResponse } from 'next/server'
import { PrismaData } from '../../config'

type DeletionResponse = NextResponse<Record<string, string>>

async function getData(
  id: string,
  modelCode: ModelsApiCode,
): Promise<PrismaData> {
  switch (modelCode) {
    case ModelsApiCode.Project:
      return await prisma.project.delete({ where: { id } })

    case ModelsApiCode.Post:
      return await prisma.post.delete({ where: { id } })

    case ModelsApiCode.Comment:
      return await prisma.comment.delete({ where: { id } })

    default:
      throw new Error(`Bad Request: Invalid Model Code`)
  }
}

const handler = async (req: Request): Promise<DeletionResponse> => {
  const url = new URL(req.url) // Create a URL object from the request URL
  const queryParams = url.searchParams // Access the query parameters

  const id = queryParams.get('id')
  const modelCode = queryParams.get('modelCode')

  if (req.method === 'DELETE') {
    if (!id || !modelCode) {
      return NextResponse.json(
        { message: 'Method not allowed? Id or ModelCode Can`t be null' },
        { status: 405 },
      )
    }

    try {
      const data = await getData(id, modelCode as ModelsApiCode)

      return NextResponse.json({ data: data?.id }, { status: 200 })
    } catch (e: unknown) {
      return NextResponse.json({ message: `${e}` }, { status: 400 })
    }
  }

  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
}

export { handler as DELETE }
