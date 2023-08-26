// REVIEW: Only working with Find Unique & Delete function
// Function overloading or rest parameters may solve it
// LINK: https://github.com/benwhut/nextjs-prisma-CRUD/blob/main/pages/api/note/%5Bid%5D.ts

import { ModelsApiCode } from "@/lib/database/table.types"
import { NextResponse } from "next/server"

// Reading
async function handleGet() {
  
}

// Creating
async function handlePost() {
  
}

// Updating
async function handlePut() {
  
}

// Deleting
async function handleDelete() {

}

export async function servicesHandler(req: Request, getData: any) {
  const url = new URL(req.url) // Create a URL object from the request URL
  const queryParams = url.searchParams // Access the query parameters

  const id = queryParams.get('id')
  const modelCode = queryParams.get('modelCode')

  if (req.method === 'POST') {
    if (id == null || modelCode == null) {
      return NextResponse.json(
        { message: 'Method not allowed? Id or ModelCode Can`t be null' },
        { status: 405 }
      )
    }

    try {
      const data = await getData(id, modelCode as ModelsApiCode)

      return NextResponse.json({ data }, { status: 200 })
    } catch (e: any) {
      return NextResponse.json({ message: `${e}` }, { status: 400 })
    }
  }

  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
}