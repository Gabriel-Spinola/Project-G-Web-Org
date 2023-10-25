import { FileBody, StorageResponse } from './storage'
import { SUPABASE_PUBLIC_BUCKET_NAME, supabase } from './supabase'

export async function storeImage(
  authorId: string,
  fileName: string,
  images: FileBody,
): Promise<StorageResponse> {
  try {
    // FIXME - failing at certain types of images
    const { data, error } = await supabase.storage
      .from(SUPABASE_PUBLIC_BUCKET_NAME)
      .upload(`posts/${authorId}/${fileName}`, images, {
        cacheControl: '3600',
        upsert: true,
      })

    if (error) {
      throw error
    }

    return data
  } catch (error: unknown) {
    console.error('failed at image storage ' + error)

    return null
  }
}
