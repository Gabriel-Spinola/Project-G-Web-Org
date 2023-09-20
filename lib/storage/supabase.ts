import { createClient } from '@supabase/supabase-js'

export const SUPABASE_PUBLIC_BUCKET_NAME = 'Vampeta-Images-Public'
export const SUPABASE_PRIVATE_BUCKET_NAME = 'Vampeta-Images'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)
