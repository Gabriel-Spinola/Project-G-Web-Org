/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

'use client'

import TextBox from '../components/TextBox'
import { SubmitButton } from '../components/SubmitButton'
import { verifyCaptcha } from '@/server/serverActions'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { signIn } from 'next-auth/react'
import { StaticImage } from '@/components/Image'
import Link from 'next/link'

export default function RecoverPage() {
  const email = useRef('')
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isVerified, setIsVerified] = useState<boolean>(false)

  async function handleCaptchaSubmission(token: string | null): Promise<void> {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsVerified(true))
      .catch(() => setIsVerified(false))
  }

  async function handleRecoverySubmission(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    signIn('email', {
      email: email.current,
      redirect: true,
      callbackUrl: '/',
    })
  }
  return (
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
              id="auth-form"
              className={`flex flex-col justify-evenly w-full h-full gap-4 items-center px-8 md:px-16`}
              onSubmit={handleRecoverySubmission}
            >
              <h1 className="md:text-base lg:text-lg x1:text-3xl mb-8 font-bold">
                {' '}
                RECUPERAR SENHA{' '}
              </h1>

              <TextBox
                className="w-full"
                labelText="E-mail"
                type={'email'}
                onChange={(e) => (email.current = e.target.value)}
              />

              <ReCAPTCHA
                sitekey={process.env.RECAPTCHA_SITE_KEY as string}
                ref={recaptchaRef}
                onChange={handleCaptchaSubmission}
                className="my-4"
              />

              <SubmitButton
                isVerified={isVerified}
                buttonText={'ENVIAR E-MAIL DE RECUPERAÇÃO'}
              />
              <p className="text-center">
                Já possui Conta?{' '}
                <Link
                  href="/login"
                  id="formButton"
                  className="text-light-primary underline hover:text-darker-primary font-bold"
                >
                  Voltar
                </Link>{' '}
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
