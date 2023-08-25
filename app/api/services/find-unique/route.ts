import { prisma } from '@/lib/database/prisma'
import { ModelsApiCode } from '@/lib/database/table.types';
import { NextResponse } from 'next/server'
import { servicesHandler } from '../services-handler';

async function getData(id: string, modelCode: ModelsApiCode) {
  switch (modelCode) {
    case ModelsApiCode.Project:
      return await prisma.project.findUnique({ where: { id: id as string } })

    case ModelsApiCode.Post:
      return await prisma.post.findUnique({ where: { id: id as string } })

    case ModelsApiCode.Comment:
      return await prisma.comment.findUnique({ where: { id: id as string } })

    default: throw new Error(`Bad Request: Invalid Model Code`)
  }
}

const handler = (req: Request) => servicesHandler(req, getData)

export { handler as GET, handler as POST }
