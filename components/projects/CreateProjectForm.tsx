// FIXME: find unique api running twice::SOLVED
// FIXME: LCP: 3743ms. Fetching the information with server components may solve it. 

'use client'

import { ProjectFormState } from '@/common.types'
import { createNewProjectApiCall, getRowDataFromAPI } from '@/lib/database/actions'
import { ModelsApiCode, ProjectModelProps } from '@/lib/database/table.types'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

type Props = {
  params: { id: string | null }
}

// REVIEW: this components is too big
export default function CreateProjectForm({ params }: Props) {
  const [data, setData] = useState<ProjectModelProps | null>(null)
  const [form, setForm] = useState<ProjectFormState | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await getRowDataFromAPI(params.id!, ModelsApiCode.Project)

        if (!response.ok)
          throw new Error("Network response was not OK");

        const { data } = await response.json()

        setData(data)
        setIsLoading(false)
      }
      catch (e: any) {
        // TODO: Client Response
        console.log(`error: ${e}`)
      }
    }

    if (params.id) {
      fetchData()
    }
    else {
      setIsLoading(false)
    }

    setForm({
      title: data?.title || '',
      description: data?.description || '',
      image: data?.images[0] || ''
    })
  }, [data?.id])

  function handleStateChange(fieldName: keyof ProjectFormState, value: string): void {
    setForm((prevForm) => {
      if (prevForm != null) return { ...prevForm, [fieldName]: value }

      return null
    })
  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.includes('image')) {
      // TODO: Client Response
      alert('Please upload an image!')

      return
    }

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      const result = reader.result as string

      handleStateChange("image", result)
    }
  }

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await createNewProjectApiCall(data?.id || null, formData)

    if (response.ok) {
      const data = await response.json()

      // TODO: Client Response
      console.log("Response is Ok: data retrieved:  " + JSON.stringify(data));
    } else {
      // TODO: Client Response
      console.log('Error submitting form data')
    }
  }

  return (
    <>
      {isLoading
        ? (<p>Loading...</p>)
        : (
          <form onSubmit={submitForm} method="POST">
            <label htmlFor="title">Title</label>

            <input
              type="text"
              id="title"
              name="title"
              color='black'
              value={form?.title ?? ''}
              onChange={(e) => handleStateChange('title', e.target.value)}
              required
            />

            <br /> <br />

            <label htmlFor="project-description">project-description</label>
            <textarea
              id="project-description"
              name="project-description"
              value={form?.description ?? ''}
              onChange={(e) => handleStateChange('description', e.target.value)}
            ></textarea>{' '}

            <br /> <br />

            <label htmlFor="project-img">project-description</label>
            <input type="file" id="project-img" name="project-img" onChange={(e) => handleChangeImage(e)} />

            {/* Multiple files */}
            {/* <input type="file" multiple /> */}

            <button type="submit">Submit</button>
          </form>
        )
      }
    </>
  )
}
