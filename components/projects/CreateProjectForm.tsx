'use client'

import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

function createProjectVoidFunction(): null {
  return null
}

export default function CreateProjectForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState<boolean>(false)

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault()

    setSubmitting(true)
    createProjectVoidFunction()
    router.push('/')
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input type="text" id="title" name="title" />
        <textarea
          id="project-description"
          name="project-description"
        ></textarea>
        <input type="file" id="project-img" name="project-img" />
      </form>
    </>
  )
}
