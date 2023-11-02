/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import SendImageButton from '@/components/Buttons/SendImageButton'
import React, { ChangeEvent, useState } from 'react'
import SubmitPostButton from '@/components/Buttons/SubmitPostButton'
import { usePathname, useRouter } from 'next/navigation'
import { validateForm } from '@/lib/schemas/post.schema'
import { createNewPost } from '@/app/(feed)/_actions'
import { validateImageInput } from '@/lib/schemas/imageValidation.schema'

interface PostFormState {
  content: string
  images: File[] | null
}

type Props = {
  closeModal: () => void
  currentUserId: string
}

export function NewPostModal({ closeModal, currentUserId }: Props) {
  const [form, setForm] = useState<PostFormState | null>({
    content: '',
    images: null,
  })
  const [images, setImages] = useState<File[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const pathName = usePathname()

  function handleStateChange(
    fieldName: keyof PostFormState,
    value: string,
  ): void {
    setForm((prevForm) => {
      if (prevForm) {
        return { ...prevForm, [fieldName]: value }
      }

      return null
    })
  }

  function onImageChanges(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    if (!event.target.files || event.target.files.length <= 0) {
      return
    }

    const { error } = validateImageInput(event.target.files[0], images?.length)

    if (error) {
      alert(error)

      return
    }

    const newImage = event.target.files[0]
    setImages((prevImages) => {
      if (prevImages) return [...prevImages, newImage]

      return [newImage]
    })
  }

  async function handleFormSubmission(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()

    if (isLoading) {
      return
    }

    const formData = new FormData(event.currentTarget)

    if (images && images?.length >= 0) {
      images?.pop()
      images?.forEach((img) => {
        formData.append('images', img)
      })
    } else {
      formData.delete('images')
    }

    const validatedForm = validateForm(formData)

    if (validatedForm.error) {
      let errorMessage = ''

      validatedForm.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ': ' + issue.message + '. \n'
      })

      alert('Algo no fomulário é invalido no campo: ' + errorMessage)

      return
    }

    setIsLoading(true)
    const { error } = await createNewPost(currentUserId, validatedForm.data)

    if (error) {
      alert('Failed to create post')

      return
    }

    setImages(undefined)
    setIsLoading(false)
    closeModal()
    router.push(pathName + '?create=1', { scroll: false })
  }

  function removeImageFromPreviewByIndex(index: number) {
    // URL.revokeObjectURL(images[index]) REVIEW - Revoking the image for performance

    setImages(
      (prevImages) => prevImages?.filter((_, prevIndex) => prevIndex !== index),
    )
  }

  return (
    <section>
      {/* Form Section */}
      <section
        id="post-form"
        className="notClose z-1 drop-shadow-sm text-xl p-8 rounded-[8px]"
      >
        <form
          method="POST"
          onSubmit={handleFormSubmission}
          className="notClose"
        >
          {/* Content */}
          <div className="notClose flex flex-row">
            <textarea
              name="content"
              placeholder="Faça uma publicação"
              className="notClose w-full pb-[192px] text-xl margin-none text-start outline-none resize-none"
              value={form?.content}
              onChange={(event) =>
                handleStateChange('content', event.target.value)
              }
              required
            ></textarea>
          </div>

          {/* Input Buttons */}
          <div className=" mt-3 flex flex-row justify-between items-center">
            <SendImageButton onChange={onImageChanges} />
            <SubmitPostButton isLoading={isLoading} />
          </div>
        </form>
      </section>

      {/* Images Preview Section */}
      <section id="images-preview">
        {images && (
          <>
            {images.map((image, index) => (
              <div key={index}>
                {/* Remove Img Button */}
                <button
                  onClick={() => removeImageFromPreviewByIndex(index)}
                  type="button"
                >
                  <span>X</span>
                </button>

                <img
                  src={URL.createObjectURL(image)}
                  width={300}
                  height={400}
                  alt="Image Sent"
                />
              </div>
            ))}
          </>
        )}
      </section>
    </section>
  )
}
