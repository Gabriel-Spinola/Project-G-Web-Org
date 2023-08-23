'use client'

import CreateProjectForm from '@/components/projects/CreateProjectForm'
import { FormEvent } from 'react'

export default function CreateProject() {
  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/handlers/', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()

      console.log(JSON.stringify(data))
    } else {
      console.log('Error submitting form data')
    }
  }

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={submitForm} method="POST">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" /> <br /> <br />
        <label htmlFor="project-description">project-description</label>
        <textarea
          id="project-description"
          name="project-description"
        ></textarea>{' '}
        <br /> <br />
        <label htmlFor="project-img">project-description</label>
        <input type="file" id="project-img" name="project-img" />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
