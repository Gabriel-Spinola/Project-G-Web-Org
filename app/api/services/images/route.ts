import { SUPABASE_STORAGE_URL } from '@/lib/apiConfig'
import { SUPABASE_PRIVATE_BUCKET_NAME, supabase } from '@/lib/storage/supabase'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { getFileIfExistsInStorage } from '../_utils'

async function handler(req: Request): Promise<unknown | null> {
  const { data, error } = await getFileIfExistsInStorage(
    SUPABASE_PRIVATE_BUCKET_NAME,
    'Tela.png',
  )

  if (error) {
    console.log('failed')

    return
  }

  console.log(`worked ${data?.at(0)?.name}`)
  try {
    const { data, error } = await supabase.storage
      .from('Vampeta-Images')
      .download('Tela.png')

    if (error) {
      throw error
    }

    const url = URL.createObjectURL(data)
    const p = supabase.storage.from('Vampeta-Images').getPublicUrl(url)

    return NextResponse.json(
      { data: 'worked ' + p.data.publicUrl },
      { status: 200 },
    )
  } catch (e: unknown) {
    return NextResponse.json({ data: 'erroro' + e }, { status: 300 })
  }
}

export { handler as POST, handler as PUT, handler as GET }
