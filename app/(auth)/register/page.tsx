/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

'use client'

import { registerNewUser } from '../_actions'
import { ESResponse } from '@/lib/types/common'
import { verifyCaptcha } from '@/server/serverActions'
import { signIn } from 'next-auth/react'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { validateRegisterForm } from '@/lib/schemas/userRegistering.schema'
import { SubmitButton } from '../components/SubmitButton'
import TextBox from '../components/TextBox'
import { FcGoogle } from 'react-icons/fc'
import { StaticImage } from '@/components/Image'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function RegisterPage() {
  const [isVerified, setIsVerified] = useState<boolean>(false)

  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleCaptchaSubmission(token: string | null): Promise<void> {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsVerified(true))
      .catch(() => {
        setIsVerified(false)

        toast.warn('Por favor, preencha o captcha corretamente')
      })
  }

  /**
   *
   * @param formData
   * @returns If something wrong happens: alert the user & reset the form. Otherwise resets the form
   * and redirect the user tho the signIn page
   */
  async function handleFormSubmission(formData: FormData): Promise<void> {
    // NOTE - 1. Error/Success Pattern for standardized error handling implementation
    const validatedForm = validateRegisterForm(formData)

    if (validatedForm.error) {
      let errorMessage = ''

      validatedForm.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ': ' + issue.message + '. \n'
      })

      toast.warn('Preencha o formulário corretamente.\n' + errorMessage + '\n')

      return
    }

    // NOTE - 2. Error/Success Pattern for standardized error handling implementation
    const { error }: ESResponse<string> = await toast.promise(
      registerNewUser(validatedForm.data),
      {
        pending: 'Estamos te registando... 🥱',
        success: 'Registrado com sucesso. 🤙',
      },
    )

    if (error) {
      toast.error('Houve um erro no cadastro, por favor tente novamente 😔')

      formRef.current?.reset()
      return
    }

    formRef.current?.reset()
    signIn(undefined, { callbackUrl: '/' })
  }

  return (
    // First Wrapper Component
    <main className="min-w-full flex max-w-full h-[calc(100vh-88px)] items-center justify-center bg-darker-white">
      {/* Login Container with Background Image */}
      <div
        className={`absolute flex flex-col items-center rounded-xl w-[90vw] h-[90vh]`}
      >
        {/* Background Image for Login Container */}
        <StaticImage
          className="w-[90vw] h-[90vh] rounded-xl scale-x-[-1] object-cover"
          url="https://ebqqbabyixbmiwalviko.supabase.co/storage/v1/object/public/Vampeta-Images-Public/static-images/wolfgang-hasselmann-eSLZXmnw0e8-unsplash.jpg"
          alt="House Image"
        />

        {/* Background Image darker overlay */}
        <div className="absolute w-full h-full bg-gradient-to-r from-black via-black/60 via-50% to-black/25 rounded-xl">
          {/* Form Container */}
          <div className="absolute w-full md:w-[65%] x1:w-[45%] 2x1:w-[35%] float-left h-full rounded-xl text-darker-white">
            <form
              ref={formRef}
              id="auth-form"
              action={handleFormSubmission}
              className={`flex flex-col justify-evenly w-full h-full gap-4 items-center px-8 md:px-16`}
            >
              <h1 className="text-xl md:text-xl lg:text-2xl font-bold text-center">
                Crie sua conta
              </h1>
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

              <TextBox
                className="w-full"
                labelText="Confime a senha"
                htmlForId="confirmPassword"
                type={'password'}
              />

              <ReCAPTCHA
                sitekey={process.env.RECAPTCHA_SITE_KEY as string}
                ref={recaptchaRef}
                onChange={handleCaptchaSubmission}
              />

              <div id="submitRegiter" className="flex w-full gap-4">
                <SubmitButton
                  isVerified={isVerified}
                  buttonText={'REGISTRAR'}
                />

                <button
                  type="button"
                  onClick={() => signIn('google')}
                  className="flex justify-around items-center text-xl bg-pure-white rounded-lg p-2 hover:scale-[101%]"
                >
                  <FcGoogle size={36} />
                </button>
              </div>

              <p className="text-center">
                Já possui Conta?{' '}
                <Link
                  href="/login"
                  id="formButton"
                  className="text-light-primary underline hover:text-darker-primary font-bold"
                >
                  Logue Aqui
                </Link>{' '}
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
