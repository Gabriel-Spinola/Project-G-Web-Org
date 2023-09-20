import { SUPABASE_STORAGE_URL } from '@/lib/apiConfig'
import { SUPABASE_PRIVATE_BUCKET_NAME, supabase } from '@/lib/storage/supabase'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { getFileIfExistsInStorage } from '../_utils'
import { handleGet } from './_get'

async function handler(req: Request): Promise<unknown | null> {
  const url = new URL(req.url)

  switch (req.method) {
    case 'GET': {
      const { fileName, folderPath } = {
        fileName: url.searchParams.get('fileName')?.toString(),
        folderPath: url.searchParams.get('folderPath')?.toString(),
      }

      if (!fileName) {
        return NextResponse.json(
          { data: "FileName can't be null" },
          { status: 400 },
        )
      }

      return handleGet(fileName, folderPath ?? '')
    }

    default:
      return NextResponse.json(
        { data: 'request failed method not allowed' },
        { status: 401 },
      )
  }
}

export { handler as POST, handler as PUT, handler as GET }
