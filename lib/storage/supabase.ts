import { createClient } from '@supabase/supabase-js'

export const SUPABASE_PUBLIC_BUCKET_NAME = 'Vampeta-Images-Public'
export const SUPABASE_PRIVATE_BUCKET_NAME = 'Vampeta-Images'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

export const getProfilePicURL = (ownerId: string, imageId: string): string =>
  supabase.storage
    .from(SUPABASE_PUBLIC_BUCKET_NAME)
    .getPublicUrl(`profile-pic/${ownerId}/${imageId}`).data.publicUrl

export const getPostImageUrl = (postId: string, imageId: string): string =>
  supabase.storage
    .from(SUPABASE_PUBLIC_BUCKET_NAME)
    .getPublicUrl(`posts/${postId}/${imageId}`).data.publicUrl

export const getProjectImageUrl = (
  projectId: string,
  imageId: string,
): string =>
  supabase.storage
    .from(SUPABASE_PUBLIC_BUCKET_NAME)
    .getPublicUrl(`project/${projectId}/${imageId}`).data.publicUrl
