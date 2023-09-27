import { NextResponse } from 'next/server'
import { getFileIfExistsInStorage } from '../_utils'
import { SUPABASE_PRIVATE_BUCKET_NAME, supabase } from '@/lib/storage/supabase'

export async function handleGet(fileName: string, folderPath = '') {
  try {
    const { data, error } = await getFileIfExistsInStorage(
      SUPABASE_PRIVATE_BUCKET_NAME,
      fileName,
      folderPath,
    )

    if (error) {
      throw error
    }

    const getPublicUrl = supabase.storage
      .from(SUPABASE_PRIVATE_BUCKET_NAME)
      .getPublicUrl(data?.name as string)

    return NextResponse.json({ data: getPublicUrl.data }, { status: 200 })
  } catch (e: unknown) {
    return NextResponse.json({ data: e }, { status: 300 })
  }
}
