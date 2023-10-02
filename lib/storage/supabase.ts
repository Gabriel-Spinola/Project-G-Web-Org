import { createClient } from '@supabase/supabase-js'

export const SUPABASE_PUBLIC_BUCKET_NAME = 'Vampeta-Images-Public'
export const SUPABASE_PRIVATE_BUCKET_NAME = 'Vampeta-Images'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
)

// SECTION - Helper functions
export const getProfilePicURL = (ownerId: string, imageId: string): string =>
  supabase.storage
    .from(SUPABASE_PUBLIC_BUCKET_NAME)
    .getPublicUrl(`profile-pic/${ownerId}/${imageId}`).data.publicUrl

/**
 * @param image the image url thats stored in the database in the `'posts/author-id/image-name_id.png'`
 * @returns The public url for rendering the image
 *
 * @example
 * ```jsx
 * <Image src={getPostImageUrl(post.images[index])} alt="img-alt" />
 * ```
 */
export const getPostImageUrl = (image: string): string =>
  supabase.storage.from(SUPABASE_PUBLIC_BUCKET_NAME).getPublicUrl(image).data
    .publicUrl

export const getProjectImageUrl = (
  projectId: string,
  imageId: string,
): string =>
  supabase.storage
    .from(SUPABASE_PUBLIC_BUCKET_NAME)
    .getPublicUrl(`project/${projectId}/${imageId}`).data.publicUrl
