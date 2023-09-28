/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import { createNewProjectApiCall } from '@/lib/database/actions'
import { Project } from '@prisma/client'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

export interface ProjectModelProps {
  id: string
  title: string
  description: string
  images: string[]
  createdAt: string
}

export interface ProjectFormState {
  title: string
  description: string
  image: string
}

type Props = {
  params: { id: string | null; project: Project | null }
}

// REVIEW
export default function CreateProjectForm({ params }: Props) {
  const [data, setData] = useState<ProjectModelProps | null>(null)
  const [form, setForm] = useState<ProjectFormState | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Mount Component
  useEffect((): void => {
    let isCancelled = false

    if (!isCancelled && params.project && !data) {
      setData({
        id: params.project.id,
        title: params.project.title,
        description: params.project.description || '',
        images: params.project.images,
        createdAt: 'placeholderDate',
      })

      console.log('setting')
    }

    setForm({
      title: data?.title || '',
      description: data?.description || '',
      image: data?.images[0] || '',
    })

    setIsLoading(false)

    console.log('running')

    // eslint-disable-next-line no-unused-expressions
    ;(): void => {
      isCancelled = true
    }
  }, [data, params.project])

  function handleStateChange(
    fieldName: keyof ProjectFormState,
    value: string,
  ): void {
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

      handleStateChange('image', result)
    }
  }

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await createNewProjectApiCall(data?.id || null, formData)

    if (response && response.ok) {
      const data = await response.json()

      // TODO: Client Response
      console.log('Response is Ok: data retrieved:  ' + JSON.stringify(data))
    } else {
      // TODO: Client Response
      console.log('Error submitting form data')
    }
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={submitForm} method="POST">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            color="black"
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
          <input
            type="file"
            id="project-img"
            name="project-img"
            onChange={(e) => handleChangeImage(e)}
          />
          {/* Multiple files */}
          {/* <input type="file" multiple /> */}
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  )
}
