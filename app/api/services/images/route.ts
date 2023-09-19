import { SUPABASE_STORAGE_URL } from '@/lib/apiConfig'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

async function handler(req: Request): Promise<unknown | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  )

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

export { handler as POST, handler as PUT }
