/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

'use client'

import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { BgImage } from '@/components/BgImage'
import TextBox from '../components/TextBox'
import { SubmitButton } from '../components/SubmitButton'
import { verifyCaptcha } from '@/server/serverActions'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { signIn } from 'next-auth/react'

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
          <form className={`flex-col`} onSubmit={handleRecoverySubmission}>
            <a
              href="/auth"
              className="hover:text-medium-secundary absolute -my-10 -mx-10"
            >
              <BsFillArrowLeftCircleFill size={32} />
            </a>

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
          </form>
        </div>
      </section>
    </main>
  )
}
