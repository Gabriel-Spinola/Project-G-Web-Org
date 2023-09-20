import { SUPABASE_PUBLIC_BUCKET_NAME, supabase } from '@/lib/storage/supabase'

interface CustomFileObject {
  name: string
  bucket_id: string
  owner: string
  id: string
  updated_at: string
  created_at: string
  last_accessed_at: string
  metadata: Record<string, unknown>
}

type CustomError = string

export async function getFileIfExistsInStorage(
  bucketName: string,
  filePath: string,
  folderPath = '',
): Promise<
  | {
      data: CustomFileObject[]
      error: null
    }
  | {
      data: null
      error: CustomError
    }
> {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(folderPath)

  if (error) {
    console.error(error)

    return { data: null, error: error.message }
  }

  const files = data.filter((item) => item.name === filePath)

  return files.length > 0
    ? { data: files, error: null }
    : { data: null, error: 'File does not exists' }
}

const getProfilePicURL = (ownerId: string, imageId: string): string =>
  `profile-pic/${ownerId}/${imageId}.png`
