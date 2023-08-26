// REVIEW: find unique api running twice

'use client'

import { ProjectFormState } from '@/common.types'
import { ModelsApiCode, ProjectModelProps } from '@/lib/database/table.types'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

type Props = {
  params: { id: string | null }
}

export default function CreateProjectForm({ params }: Props) {
  const [data, setData] = useState<ProjectModelProps | null>(null)
  const [form, setForm] = useState<ProjectFormState | null>(null)


  useEffect(function () {
    async function fetchData() {
      const response = await fetch(
        `/api/services/find-unique/?id=${params.id}&modelCode=${ModelsApiCode.Project}`,
        { method: 'POST', }
      )

      if (response.ok) {
        const { data } = await response.json()

        setData(data)
      }
    }

    if (params.id) {
      fetchData().then(() => {
        setForm({
          title: data?.title || '',
          description: data?.description || '',
          image: data?.images[0] || ''
        })
      });
    }
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

  async function APICall(id: string | null, formData: FormData): Promise<Response> {
    const url = id
      ? `/api/handlers/CreateProjectFormHandler/?id=${id}`
      : '/api/handlers/CreateProjectFormHandler/'

    return await fetch(url, {
      method: id ? 'PUT' : 'POST',
      body: formData,
    })
  }

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await APICall(data?.id || null, formData)

    if (response.ok) {
      const data = await response.json()
      // TODO: Client Response
      console.log("Stringfying data:" + JSON.stringify(data));
    } else {
      // TODO: Client Response
      console.log('Error submitting form data')
    }
  }

  return (
    <>
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

        <button type="submit">Submit</button>
      </form>
    </>
  )
}
