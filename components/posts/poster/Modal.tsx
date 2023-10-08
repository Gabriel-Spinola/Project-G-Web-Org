/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import SendImageButton from './SendImageButton'
import SendPDFButton from './SendPDFButton'
import React, { ChangeEvent, useState } from 'react'
import SubmitPostButton from './SubmitPostButton'
import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'

interface PostFormState {
  content: string
  images: File[] | null
}

type Props = {
  closeModal: () => void
  revalidate?: () => void
  currentUserId: string
}

export function FeedModal({ revalidate, closeModal, currentUserId }: Props) {
  const [form, setForm] = useState<PostFormState | null>({
    content: '',
    images: null,
  })
  const [images, setImages] = useState<File[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)

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

  async function onImageChanges(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    if (!event.target.files || event.target.files.length <= 0) {
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

    const formData = new FormData(event.currentTarget)

    images?.pop()
    images?.forEach((img) => {
      formData.append('images', img)
    })

    console.log(formData.getAll('images'))

    try {
      const response = await fetch(
        `${API_URL}${API_ENDPOINTS.services.posts}?id=${currentUserId}`,
        {
          method: 'POST',
          body: formData,
        },
      )

      const { data } = await response.json()

      if (!response.ok) {
        throw new Error('response not ok' + JSON.stringify(data))
      }

      console.log('worked ' + JSON.stringify(data))

      setImages(undefined)

      closeModal()
      if (revalidate) {
        revalidate()
      }
    } catch (error: unknown) {
      console.error(error)
    }
  }
 
  function removeImageFromPreviewByIndex(index: number) {
    setImages(
      (prevImages) => prevImages?.filter((_, prevIndex) => prevIndex !== index),
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="w-[40vw] h-[260px] flex flex-col mt-[-20%] z-10">
        {/* Form Section */}
        <section
          id="post-form"
          className="notClose z-1 drop-shadow-sm bg-medium-gray text-darker-white text-xl p-8 rounded-[8px]"
        >
          <form
            method="POST"
            onSubmit={handleFormSubmission}
            className="notClose"
          >
            {/* Content */}
            <div className="notClose max-h-[80px] flex flex-row">
              <textarea
                name="content"
                placeholder="Faça uma publicação"
                className="notClose bg-medium-gray text-darker-white w-full pb-[192px] text-xl margin-none text-start outline-none"
                value={form?.content}
                onChange={(event) =>
                  handleStateChange('content', event.target.value)
                }
              ></textarea>
            </div>

            {/* Input Buttons */}
            <div className=" mt-3 flex flex-row">
              <SendPDFButton />
              <SendImageButton onChange={onImageChanges} />

              <SubmitPostButton />
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
      </div>
    </div>
  )
}
