/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import { registerNewUser } from '@/app/auth/register/registerActions'
import { verifyCaptcha } from '@/server/serverActions'
import { signIn } from 'next-auth/react'
import { useRef, useState } from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import ReCAPTCHA from 'react-google-recaptcha'

function SubmitButton({ isVerified }: { isVerified: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      aria-disabled={pending || !isVerified}
      disabled={pending || !isVerified}
      style={{
        backgroundColor: `${pending ? '#ccc' : '#3446eb'}`,
        color: '#fff',
        padding: '1rem',
        cursor: 'pointer',
      }}
    >
      {pending ? 'Carregando' : 'Registrar'}
    </button>
  )
}

export default function RegisterForm() {
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleCaptchaSubmission(token: string | null): Promise<void> {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsVerified(true))
      .catch(() => setIsVerified(false))
  }

  async function handleFormSubmission(formData: FormData): Promise<void> {
    const { error } = await registerNewUser(formData)

    if (error) {
      alert('user creation failed')

      formRef.current?.reset()
      return
    }

    formRef.current?.reset()
    signIn(undefined, { callbackUrl: '/' })
  }

  return (
    <form
      ref={formRef}
      action={handleFormSubmission}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        rowGap: 10,
      }}
    >
      <label htmlFor="name">Name</label>
      <input required type="text" name="name" style={{ padding: '1rem' }} />

      <label htmlFor="email">Email</label>
      <input required type="email" name="email" style={{ padding: '1rem' }} />

      <label htmlFor="password">Password</label>
      <input
        required
        type="password"
        name="password"
        style={{ padding: '1rem' }}
      />

      <ReCAPTCHA
        sitekey={process.env.RECAPTCHA_SITE_KEY as string}
        ref={recaptchaRef}
        onChange={handleCaptchaSubmission}
      />

      <SubmitButton isVerified={isVerified} />
    </form>
  )
}
