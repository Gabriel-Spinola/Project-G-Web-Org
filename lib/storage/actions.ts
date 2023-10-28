import { ESResponse } from '../types/common'
import { ESFailed } from '../types/helpers'
import { FileBody, StorageResponse } from './storage'
import { SUPABASE_PUBLIC_BUCKET_NAME, supabase } from './supabase'

export async function storeFile(
  url: string,
  file: FileBody,
): Promise<StorageResponse> {
  try {
    const { data, error } = await supabase.storage
      .from(SUPABASE_PUBLIC_BUCKET_NAME)
      .upload(url, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (error) {
      throw error
    }

    return data
  } catch (error: unknown) {
    console.error('failed at image storage ' + JSON.stringify(error))

    return null
  }
}

export async function storeMultipleFiles(
  relativePath: string,
  files: File[],
): Promise<ESResponse<never, string>> {
  const storedImages = await Promise.all(
    files.map((file: File) => storeFile(relativePath + file.name, file)),
  )

  if (storedImages.some((file) => !file || !file.path)) {
    return ESFailed('Failed to store some file')
  }

  return {} as never
}
