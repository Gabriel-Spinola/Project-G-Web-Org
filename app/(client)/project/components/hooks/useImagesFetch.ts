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
  ownerId?: string,
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

          const file = new File([data], path, {
            type: `image/${path.substring(path.indexOf('.'))}`,
          })
          return file
        }),
      )

      setImages(files)
    } catch (error: unknown) {
      console.error('Failed to fetch images' + error)
    }
  }, [])

  useEffect(() => {
    if (paths && ownerId) {
      fetchImage(paths, ownerId)
    }
  }, [fetchImage, paths, ownerId])

  return [images, setImages]
}
