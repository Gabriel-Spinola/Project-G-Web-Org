// REVIEW: Only working with Find Unique & Delete function
// Function overloading or rest parameters may solve it
// LINK: https://github.com/benwhut/nextjs-prisma-CRUD/blob/main/pages/api/note/%5Bid%5D.ts

import { prisma } from "@/lib/database/prisma"
import { ModelsApiCode } from "@/lib/database/table.types"
import { NextResponse } from "next/server"

export async function servicesHandler(req: Request, getData: any) {
  const url = new URL(req.url) // Create a URL object from the request URL
  const queryParams = url.searchParams // Access the query parameters

  const id = queryParams.get('id')
  const modelCode = queryParams.get('modelCode') as ModelsApiCode

  if (!modelCode) {
    return NextResponse.json({ message: 'ServicesHandler::ModelCode can\'t be null' }, { status: 400 })
  }

  try {
    const data = await getData(id, modelCode)

    return NextResponse.json({ data }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ message: `${e}` }, { status: 400 })
  }
}