/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

'use client'

import { registerNewUser } from '@/app/auth/register/_actions'
import { ESResponse } from '@/lib/types/common'
import { verifyCaptcha } from '@/server/serverActions'
import { signIn } from 'next-auth/react'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { validateRegisterForm } from '@/lib/schemas/userRegisteringSchema'
import { RegisterButton } from './RegisterButton'

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

  /**
   * TODO - Instead of alerts add customized error messages for the user
   *
   * @param formData
   * @returns If something wrong happens: alert the user & reset the form. Otherwise resets the form
   * and redirect the user tho the signIn page
   */
  async function handleFormSubmission(formData: FormData): Promise<void> {
    // NOTE - 1. Error/Success Pattern for standardized error handling implementation
    const validatedForm = validateRegisterForm(formData)

    if (validatedForm.error) {
      alert('Algo no fomulário é invalido' + validatedForm.error.message)

      return
    }

    // NOTE - 2. Error/Success Pattern for standardized error handling implementation
    const { error }: ESResponse<string> = await registerNewUser(
      validatedForm.data,
    )

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
      <input type="text" name="name" style={{ padding: '1rem' }} required />

      <label htmlFor="email">Email</label>
      <input type="email" name="email" style={{ padding: '1rem' }} required />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        style={{ padding: '1rem' }}
        required
      />

      <ReCAPTCHA
        sitekey={process.env.RECAPTCHA_SITE_KEY as string}
        ref={recaptchaRef}
        onChange={handleCaptchaSubmission}
      />

      <RegisterButton isVerified={isVerified} />
    </form>
  )
}
