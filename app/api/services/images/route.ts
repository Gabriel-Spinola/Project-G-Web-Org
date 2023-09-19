import { SUPABASE_STORAGE_URL } from '@/lib/apiConfig'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

async function handler(req: Request): Promise<unknown | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  )

  try {
    const { data } = await supabase.storage
      .from('Vampeta-Images')
      .getPublicUrl('profilePic/123/456.png')

    if (error) {
      throw error
    }

    // const url = URL.createObjectURL(data)

    return NextResponse.json(
      { data: 'worked ' + data.signedUrl },
      { status: 200 },
    )
  } catch (e: unknown) {
    return NextResponse.json({ data: 'erroro' + e }, { status: 200 })
  }
}

export { handler as POST, handler as PUT }
