'use client'
// TODO: required captcha

import { verifyCaptcha } from '@/server/serverActions'
import { signIn } from 'next-auth/react'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

type RegisterFormState = {
  name: string
  email: string
  password: string
}

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form, setForm] = useState<RegisterFormState>({
    name: '',
    email: '',
    password: '',
  })
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isVerified, setIsVerified] = useState<boolean>(false)

  console.log(isVerified)

  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsVerified(true))
      .catch(() => setIsVerified(false))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isVerified) return

    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/api/services/register/', {
        method: 'POST',
        body: formData,
      })

      setIsLoading(false)

      if (!response.ok) {
        alert((await response.json()).message)

        return
      }

      console.log(JSON.stringify(response.json()))
      signIn(undefined, { callbackUrl: '/' })
    } catch (e: any) {
      setIsLoading(false)

      console.error(e)
      alert(e.message)
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setForm({ ...form, [name]: value })
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        rowGap: 10,
      }}
    >
      <label htmlFor="name">Name</label>
      <input
        required
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        style={{ padding: '1rem' }}
      />

      <label htmlFor="email">Email</label>
      <input
        required
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        style={{ padding: '1rem' }}
      />

      <label htmlFor="password">Password</label>
      <input
        required
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        style={{ padding: '1rem' }}
      />

      <ReCAPTCHA
        sitekey={process.env.RECAPTCHA_SITE_KEY as string}
        ref={recaptchaRef}
        onChange={handleCaptchaSubmission}
      />

      <button
        style={{
          backgroundColor: `${isLoading ? '#ccc' : '#3446eb'}`,
          color: '#fff',
          padding: '1rem',
          cursor: 'pointer',
        }}
        disabled={isLoading || !isVerified}
      >
        {isLoading ? 'loading...' : 'Register'}
      </button>
    </form>
  )
}
