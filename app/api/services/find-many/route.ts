import { prisma } from '@/lib/database/prisma'
import { ModelsApiCode } from '@/lib/apiConfig'
import { servicesHandler } from '../services-handler'
import { PrismaData } from '../../config'
import { NextResponse } from 'next/server'

async function getData(
  id: string,
  modelCode: ModelsApiCode,
): Promise<PrismaData> {
  switch (modelCode) {
    case ModelsApiCode.Project:
      return await prisma.project.findMany()

    case ModelsApiCode.Post:
      return await prisma.post.findMany()

    case ModelsApiCode.Comment:
      return await prisma.comment.findMany()

    default:
      throw new Error(`Bad Request: Invalid Model Code`)
  }
}

const handler = async (req: Request) => {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return NextResponse.json(
      { status: 'fail', message: 'You are not logged in' },
      { status: 401 },
    )
  }

  return await servicesHandler(req, getData)
}

export { handler as GET, handler as POST }
