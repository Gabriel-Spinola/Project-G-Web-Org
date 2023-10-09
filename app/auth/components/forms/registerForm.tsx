/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

'use client'

import { registerNewUser } from '@/app/auth/_actions'
import { ESResponse } from '@/lib/types/common'
import { verifyCaptcha } from '@/server/serverActions'
import { signIn } from 'next-auth/react'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { validateRegisterForm } from '@/lib/schemas/userRegisteringSchema'
import { SubmitButton } from '../submitButton'
import TextBox from '../textBox'

interface Props {
  handleFormChange: () => void
}

export default function RegisterForm({ handleFormChange }: Props) {
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
      className={`flex-col w-full gap-4 items-center}`}
    >
      <TextBox
        className="w-full"
        labelText="Nome"
        htmlForId="name"
        type={'text'}
      />

      <TextBox
        className="w-full"
        labelText="E-mail"
        htmlForId="email"
        type={'email'}
      />

      <TextBox
        className="w-full"
        labelText="Senha"
        htmlForId="password"
        type={'password'}
      />

      <ReCAPTCHA
        sitekey={process.env.RECAPTCHA_SITE_KEY as string}
        ref={recaptchaRef}
        onChange={handleCaptchaSubmission}
        className="my-5"
      />

      <SubmitButton isVerified={isVerified} buttonText={'REGISTRAR'} />

      <p>
        Já possui Conta?{' '}
        <a
          href="#"
          id="formButton"
          className="text-light-secundary underline hover:text-darker-secundary font-bold"
          onClick={handleFormChange}
        >
          Logue Aqui
        </a>{' '}
      </p>
    </form>
  )
}
