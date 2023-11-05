import { Project } from '@prisma/client'
import { APIResponse } from '../_utils'
import { NextResponse } from 'next/server'

// TODO - Add pagination + get features
export async function handleGet(
  id: string,
): Promise<APIResponse<Project[] | string>> {
  return NextResponse.json({ data: 'aasas' }, { status: 200 })
}
