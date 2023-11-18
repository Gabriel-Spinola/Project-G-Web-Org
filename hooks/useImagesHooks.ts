import { validateImageInput } from '@/lib/schemas/imageValidation.schema'
import { downloadFile } from '@/lib/storage/actions'
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

export type ImageStateObj = {
  images: File[] | undefined
  setImages: Dispatch<SetStateAction<File[] | undefined>>
}

type ImageState = [
  File[] | undefined,
  Dispatch<SetStateAction<File[] | undefined>>,
]

type Callbacks = {
  /**
   * @summary Validate and add images to the preview
   */
  onImageChanges: (event: ChangeEvent<HTMLInputElement>) => void

  /**
   * Remove the selected image from the preview
   * @param index index of the image to be removed
   */
  onImageRemovedFromPreview: (index: number) => void
}

/**
 * useState for images files + image fetching
 * @param paths Relative path to fetch images from api
 * @param ownerId The images owner ID
 * @returns Image State
 */
export function useImages(paths?: string[], ownerId?: string): ImageState {
  const [images, setImages] = useState<File[] | undefined>(undefined)

  const fetchImages = useCallback(async (paths: string[], ownerId: string) => {
    try {
      const files = await Promise.all(
        paths.map(
          async (path: string) =>
            await downloadFile(`projects/${ownerId}/images/${path}`, path),
        ),
      )

      setImages(files)
    } catch (error: unknown) {
      console.error('Failed to fetch images' + error)

      // TODO - Add error handling
    }
  }, [])

  useEffect(() => {
    if (paths && ownerId) {
      fetchImages(paths, ownerId)
    }
  }, [fetchImages, paths, ownerId])

  return [images, setImages]
}

/**
 * Custom hook for accessing useful callbacks to display images behavior in the client
 * @param state the image useState
 * @param imagesLimit the maximum amount of images that can be added to the preview
 * @returns two Callbacks
 */
export function useImagesCallbacks(
  state: ImageStateObj,
  imagesLimit: number,
): Callbacks {
  function onImageChanges(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    if (!event.target.files || event.target.files.length <= 0) {
      return
    }

    const { error } = validateImageInput(
      event.target.files[0],
      state.images?.length,
      imagesLimit,
    )

    if (error) {
      alert(error)

      return
    }

    const newImage = event.target.files[0]
    state.setImages((prevImages) => {
      if (prevImages) return [...prevImages, newImage]

      return [newImage]
    })
  }

  function onImageRemovedFromPreview(index: number) {
    // REVIEW - Revoking the image for performance
    // URL.revokeObjectURL(images[index])

    state.setImages(
      (prevImages) => prevImages?.filter((_, prevIndex) => prevIndex !== index),
    )
  }

  return {
    onImageChanges,
    onImageRemovedFromPreview,
  }
}
