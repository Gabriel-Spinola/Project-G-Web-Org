import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import React from 'react'

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
            headers: {
              'X-API-Key': process.env.API_SECRET as string,
            },
            body: formData,
          },
        )

        const { data } = await response.json()

        if (!response.ok) {
          throw new Error('response not ok' + JSON.stringify(data))
        }

        console.log('worked ' + JSON.stringify(data))
        // revalidatePath('/(client)/temp/with-server/')
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
