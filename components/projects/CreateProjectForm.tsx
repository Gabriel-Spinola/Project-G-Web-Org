'use client'

import { useRouter } from 'next/navigation'
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

  return <></>
}
