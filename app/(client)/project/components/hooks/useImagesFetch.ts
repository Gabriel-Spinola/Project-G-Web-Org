import { SUPABASE_PUBLIC_BUCKET_NAME, supabase } from '@/lib/storage/supabase'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

export function useImages(
  paths?: string[],
  projectId?: string,
): [File[] | undefined, Dispatch<SetStateAction<File[] | undefined>>] {
  const [images, setImages] = useState<File[] | undefined>(undefined)

  const fetchImage = useCallback(async (paths: string[], ownerId: string) => {
    try {
      const files = await Promise.all(
        paths.map(async (path: string) => {
          const { data, error } = await supabase.storage
            .from(SUPABASE_PUBLIC_BUCKET_NAME)
            .download(`projects/${ownerId}/images/${path}`)

          if (error) {
            console.error(error)

            throw new Error('failed to get image')
          }

          return data as File
        }),
      )

      setImages(files)
    } catch (error: unknown) {
      console.error('Failed to fetch images' + error)
    }
  }, [])

  useEffect(() => {
    if (paths && projectId) {
      fetchImage(paths, projectId)
    }
  }, [fetchImage, paths, projectId])

  return [images, setImages]
}
