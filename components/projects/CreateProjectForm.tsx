'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function CreateProjectForm() {
  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/handlers/CreateProjectFormHandler/', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()

      // TODO: Client Response
      console.log(JSON.stringify(data))
    } else {
      // TODO: Client Response
      console.log('Error submitting form data')
    }
  }

  return (
    <>
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
