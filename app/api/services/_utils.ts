import { supabase } from '@/lib/storage/supabase'
import { ESResponse } from '@/lib/types/common'
import { ESFailed } from '@/lib/types/helpers'

/**
 * @summary Handmade re-creation of the FileObject API from supabase.
 */
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

export async function getFileIfExistsInStorage(
  bucketName: string,
  filePath: string,
  folderPath: string,
): Promise<ESResponse<CustomFileObject, string>> {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(folderPath)

  if (error) {
    console.error(error)

    return ESFailed(error.message)
  }

  const files = data.filter((item) => item.name === filePath).at(0)

  return files !== undefined
    ? { data: files, error: {} as never }
    : { data: {} as never, error: 'File does not exists' }
}
