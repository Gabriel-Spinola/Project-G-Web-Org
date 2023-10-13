import TextBox from './TextBox'
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitButton } from './SubmitButton'
import { useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
import { verifyCaptcha } from '@/server/serverActions'

export default function LoginForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const email = useRef('')
  const password = useRef('')
  const [isVerified, setIsVerified] = useState<boolean>(false)

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
  )
}
