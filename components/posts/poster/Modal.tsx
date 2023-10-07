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

function toBase64(file: File): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      resolve(fileReader.result)
    }

    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

type Props = {
  revalidate?: () => void
}

export function FeedModal({ revalidate }: Props) {
  const [form, setForm] = useState<PostFormState | null>({
    content: '',
    images: null,
  })
  const [images, setImages] = useState<File | null>(null)
  const [base64, setBase64] = useState<string | null>(null)
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

  function onImageChanges(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    if (!event.target.files) {
      return
    }

    setImages(event.target.files[0])
  }

  async function handleFormSubmission(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const base64 = await toBase64(images as File)
    setBase64(base64 as string)

    try {
      const response = await fetch(
        `${API_URL}${API_ENDPOINTS.services.posts}?id=clneuw2o60000w494md2x3u8f`,
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

      setImages(null)
      setBase64(null)

      if (revalidate) {
        revalidate()
      }
    } catch (e: unknown) {
      console.error(e)
    }
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
                onChange={(event): void =>
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
          {base64 && (
            <img src={base64} width={300} height={400} alt="Image Sent" />
          )}
        </section>
      </div>
    </div>
  )
}
