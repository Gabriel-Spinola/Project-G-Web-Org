/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

'use client'

import { registerNewUser } from '@/app/auth/register/registerActions'
import { ESResponse } from '@/lib/common'
import { verifyCaptcha } from '@/server/serverActions'
import { signIn } from 'next-auth/react'
import { useRef, useState } from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { z as zod } from 'zod'
import ReCAPTCHA from 'react-google-recaptcha'

export type FormExpectedData = {
  name: string
  password: string
  email: string
}

export const formDataSchema = zod.object({
  name: zod
    .string({
      required_error: 'Por favor insira o seu nome',
      invalid_type_error:
        'Seu nome somente não deve conter números ou caracteres inválidos',
    })
    .min(1)
    .max(50),
  email: zod.string({ required_error: 'Por favor insira o seu email' }).toLowerCase().email(),
  password: zod
    .string({ required_error: 'Por favor insira o seu nome' })
    .max(64)
    .min(6),
})

function SubmitButton({ isVerified }: { isVerified: boolean }) {
  // NOTE - Gathers the current form status
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

  /**
   * @param formData
   * @returns Either the expected data from the form, or a ZodError object with error info
   */
  function validateForm(
    formData: FormData,
  ): ESResponse<FormExpectedData, zod.ZodError<FormExpectedData>> {
    const parsedFormData = formDataSchema.safeParse(
      Object.fromEntries(formData.entries()),
    )

    if (!parsedFormData.success) {
      return { data: null, error: parsedFormData.error }
    }

    return { data: parsedFormData.data, error: null }
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
    const validatedForm = validateForm(formData)

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

      <SubmitButton isVerified={isVerified} />
    </form>
  )
}
