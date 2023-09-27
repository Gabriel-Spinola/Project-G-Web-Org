import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { revalidatePath } from 'next/cache'
import React, { useState } from 'react'

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

export default async function CreatePost() {
  // let base64: string | null = null

  async function handleSubmit(formData: FormData) {
    'use server'

    const images = formData.get('images') as File[] | null

    console.log(images)

    if (images) {
      // base64 = (await toBase64(images[0])) as string

      try {
        const response = await fetch(
          `${API_URL}${API_ENDPOINTS.services.posts}?id=clmuuc8ek0000w4rkqu3pvwhc`,
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
        // revalidatePath('/client/temp/with-server/')
      } catch (e: unknown) {
        console.error(e)
      }
    }
  }

  return (
    <main>
      <form method="POST" action={handleSubmit}>
        <input type="text" name="title" id="title" required />

        <input type="text" name="content" id="content" required />

        <input
          type="file"
          name="images"
          accept="image/*"
          id="images"
          multiple
        />

        <button type="submit">Send Data</button>
      </form>
    </main>
  )
}
