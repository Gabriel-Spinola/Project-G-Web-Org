'use client'

import { CreateProfileFormState } from '@/view/front.types'
import React, { FormEvent, useState } from 'react'

export default function CreateProfile() {
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [form, setForm] = useState<CreateProfileFormState>({
    username: '',
    email: '',
    description: '',
    avatarUrl: '',
    linkedinUrl: '',
  })

  const handleStateChange = (
    fieldName: keyof CreateProfileFormState,
    value: string,
  ) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }))
  }

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmitting(true)
  }

  return (
    <main>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(value) =>
            handleStateChange('username', value.target.value)
          }
        />

        <input
          type="email"
          name="email"
          id="email"
          onChange={(value) => handleStateChange('email', value.target.value)}
        />

        <input
          type="text"
          name="description"
          id="description"
          onChange={(value) =>
            handleStateChange('description', value.target.value)
          }
        />

        <input
          type="text"
          name="avatarUrl"
          id="avatarUrl"
          onChange={(value) =>
            handleStateChange('avatarUrl', value.target.value)
          }
        />

        <input
          type="text"
          name="linkedinUrl"
          id="linkedinUrl"
          onChange={(value) =>
            handleStateChange('linkedinUrl', value.target.value)
          }
        />
      </form>
    </main>
  )
}
