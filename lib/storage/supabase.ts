import { createClient } from '@supabase/supabase-js'

export const SUPABASE_PUBLIC_BUCKET_NAME = 'Vampeta-Images-Public'
export const SUPABASE_PRIVATE_BUCKET_NAME = 'Vampeta-Images'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

export const generateProfilePicURL = (): string => {
  
}

export const getProfilePicURL = (ownerId: string, imageId: string): string =>
  supabase.storage
    .from(SUPABASE_PUBLIC_BUCKET_NAME)
    .getPublicUrl(`profile-pic/${ownerId}/${imageId}`).data.publicUrl

export const getPostUrl = (postId: string, imageId: string): string =>
  supabase.storage
    .from(SUPABASE_PUBLIC_BUCKET_NAME)
    .getPublicUrl(`posts/${postId}/${imageId}`).data.publicUrl
