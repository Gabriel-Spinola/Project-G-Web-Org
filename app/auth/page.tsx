/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

'use client'

import { BgImage } from '@/components/BgImage'
import { useRef, useState } from 'react'
import TextBox from './components/TextBox'
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitButton } from './components/SubmitButton'
import { verifyCaptcha } from '@/server/serverActions'
import { signIn } from 'next-auth/react'
import { LogoutButton } from '@/components/debug/AuthButtons'
import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function LoginPage() {
  const session = await getServerSession(AuthOptions)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const email = useRef('')
  const password = useRef('')
  const [isVerified, setIsVerified] = useState<boolean>(false)

  // Login function
  async function handleLoginForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    signIn('credentials', {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: '/',
    })
  }

  async function handleCaptchaSubmission(token: string | null): Promise<void> {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsVerified(true))
      .catch(() => setIsVerified(false))
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
          {JSON.stringify(session) !== null ? (
            <form
              onSubmit={handleLoginForm}
              id="loginForm"
              className={`flex-col items-center w-[100%] gap-8`}
            >
              <h1 className="md:text-base lg:text-lg x1:text-3xl mb-8 font-bold">
                {' '}
                LOGIN{' '}
              </h1>

              <TextBox
                className="w-full"
                labelText="E-mail"
                type={'email'}
                onChange={(e) => (email.current = e.target.value)}
              />
              <TextBox
                className="w-full"
                labelText="Senha"
                type={'password'}
                onChange={(e) => (password.current = e.target.value)}
              />

              <p>
                Esqueceu a senha?{' '}
                <a
                  href="auth/recover"
                  id="formButton"
                  className="text-light-secundary underline hover:text-darker-secundary font-bold"
                >
                  Clique aqui
                </a>{' '}
              </p>

              <ReCAPTCHA
                sitekey={process.env.RECAPTCHA_SITE_KEY as string}
                ref={recaptchaRef}
                onChange={handleCaptchaSubmission}
                className="my-4"
              />

              <SubmitButton isVerified={isVerified} buttonText={'ENTRAR'} />
              <p>
                Precisa criar uma conta?{' '}
                <a
                  href="auth/register"
                  id="formButton"
                  className="text-light-secundary underline hover:text-darker-secundary font-bold"
                >
                  Crie aqui
                </a>{' '}
              </p>
            </form>
          ) : (
            <LogoutButton />
          )}
        </div>
      </section>
    </main>
  )
}
