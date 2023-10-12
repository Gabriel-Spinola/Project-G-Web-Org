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
import { SubmitButton } from '../components/SubmitButton'
import TextBox from '../components/TextBox'
import { BgImage } from '@/components/BgImage'

export default function RegisterPage() {
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
    <main className="min-w-full flex max-w-full h-[calc(100vh-88px)]">
      <BgImage
        url={
          'https://images.unsplash.com/photo-1633354574427-b0dd0697130a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80'
        }
        alt={'SingInBgImage'}
      />
      <section
        id="loginContainer"
        className="min-w-full min-h-full flex items-center justify-center"
      >
        <div
          className={`absolute flex flex-col items-center rounded-xl bg-gradient-to-tl from-medium-tertiary to-medium-primary border-solid border-2 border-light-white text-darker-white p-16`}
        >
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
                href="/auth"
                id="formButton"
                className="text-light-secundary underline hover:text-darker-secundary font-bold"
              >
                Logue Aqui
              </a>{' '}
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
