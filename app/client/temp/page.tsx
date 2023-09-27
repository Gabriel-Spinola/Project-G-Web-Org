'use client'

import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import React, { ChangeEvent, useState } from 'react'

interface PostFormState {
  title: string
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

// LINK - https://youtu.be/9WvJDor5uvo?si=-J2R7Ev2XoxB6eWX
// REVIEW - Consider usage of Zact
export default function CreatePost() {
  const [form, setForm] = useState<PostFormState | null>({
    title: '',
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (images) {
      const formData = new FormData(event.currentTarget)

      const base64 = await toBase64(images as File)
      setBase64(base64 as string)

      try {
        const response = await fetch(
          `${API_URL}${API_ENDPOINTS.services.posts}?id=clmz40axx0000ecugc38z6mbb`,
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
      } catch (e: unknown) {
        console.error(e)
      }
    }
  }

  return (
    <main>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          value={form?.title ?? ''}
          onChange={(event) => handleStateChange('title', event.target.value)}
          required
        />

        <input
          type="text"
          name="content"
          id="content"
          value={form?.content ?? ''}
          onChange={(event) => handleStateChange('content', event.target.value)}
          required
        />

        <input
          type="file"
          name="images"
          accept="image/*"
          id="images"
          onChange={onImageChanges}
          multiple
        />

        <button type="submit">Send Data</button>
      </form>

      {base64 && <img src={base64} width={300} height={400} alt="Image Sent" />}
    </main>
  )
}
