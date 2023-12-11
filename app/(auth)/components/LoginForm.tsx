/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

'use client'

import TextBox from './TextBox'
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitButton } from './buttons/SubmitButton'
import { useRef } from 'react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { validateForm } from '@/lib/schemas/login.schema'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useCaptcha } from '@/hooks/useCaptcha'
import { buildValidationErrorMessage } from '@/lib/schemas/actions'

export default function LoginForm() {
  const router = useRouter()

  const { ref: captchaRef, isVerified, handleCaptchaSubmission } = useCaptcha()
  const email = useRef('')
  const password = useRef('')

  async function handleLoginForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData()
    formData.append('email', email.current)
    formData.append('password', password.current)

    const { data, error } = validateForm(formData)

    if (error) {
      return buildValidationErrorMessage(error, (errorMessage) =>
        toast.warn(
          'Por favor preencha o fomulário corretamente\n' + errorMessage,
        ),
      )
    }

    const signInResponse = await toast.promise(
      signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      }),
      { pending: 'Fazendo login....🥱' },
    )

    if (signInResponse) {
      if (signInResponse.error) {
        toast.error(
          'Falha ao fazer login, certifique-se de que suas informações estão corretas.',
        )

        return
      }
    }

    toast.success('🤙')

    router.push('/')
  }

  return (
    <form
      onSubmit={handleLoginForm}
      id="auth-form"
      className="flex flex-col items-center justify-evenly w-full h-full max-h-[800px]"
    >
      <TextBox
        className="w-full text-pure-white pb-4"
        labelText="E-mail"
        type={'email'}
        onChange={(e) => (email.current = e.target.value)}
      />
      <TextBox
        className="w-full text-pure-white"
        labelText="Senha"
        type={'password'}
        onChange={(e) => (password.current = e.target.value)}
      />

      <p className="text-center pt-4 text-pure-white drop-shadow-[0_01px_01px_rgba(0,0,0,0.35)]">
        Esqueceu a senha?{' '}
        <Link
          href="/recover"
          id="formButton"
          className="text-light-primary underline hover:text-darker-primary font-bold"
        >
          Clique aqui
        </Link>{' '}
      </p>

      <ReCAPTCHA
        sitekey={process.env.RECAPTCHA_SITE_KEY as string}
        ref={captchaRef}
        onChange={handleCaptchaSubmission}
        className="p-4"
      />

      <div id="submitLogin" className="flex w-full gap-4">
        <SubmitButton isVerified={isVerified} buttonText={'ENTRAR'} />

        <button
          type="button"
          onClick={() => signIn('google')}
          className="flex justify-around items-center text-xl w-24 bg-pure-white rounded-lg hover:scale-[101%]"
        >
          <FcGoogle size={36} />
        </button>
      </div>

      <p className="text-center p-4 text-pure-white drop-shadow-[0_01px_01px_rgba(0,0,0,0.35)]">
        Precisa criar uma conta?{' '}
        <Link
          href="/register"
          id="formButton"
          className="text-light-primary underline hover:text-darker-primary font-bold"
        >
          Crie aqui
        </Link>{' '}
      </p>
    </form>
  )
}
