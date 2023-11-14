import {
  SUPABASE_PUBLIC_BUCKET_NAME,
  getProjectImageUrl,
  supabase,
} from '@/lib/storage/supabase'
import { ESFailed } from '@/lib/types/helpers'
import { useCallback, useState } from 'react'

export function useImagesFetch(paths: string[], projectId: string) {
  const [images, setImages] = useState<File[] | undefined>(undefined)

  useCallback(async () => {
    try {
      const files = await Promise.all(
        paths.map(async (path: string) => {
          console.log(getProjectImageUrl(path))
          const { data, error } = await supabase.storage
            .from(SUPABASE_PUBLIC_BUCKET_NAME)
            .download(`projects/${projectId}/images/${path}`)

          if (error) {
            console.error(error)

            throw new Error('failed to get image')
          }

          return data as File
        }),
      )

      setImages(files)
    } catch (error: unknown) {
      return ESFailed(error)
    }
  }, [paths, projectId])

  return [images, setImages]
}
