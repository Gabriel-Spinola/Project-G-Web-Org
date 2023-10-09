'use client'

import { signIn } from 'next-auth/react'
import { useRef, useState } from 'react'
import TextBox from './textBox'
import { Button } from '@chakra-ui/react'
import { registerNewUser } from '@/app/auth/register/_actions'
import { ESResponse } from '@/lib/types/common'
import { verifyCaptcha } from '@/server/serverActions'
import ReCAPTCHA from 'react-google-recaptcha'
import { validateRegisterForm } from '@/lib/schemas/userRegisteringSchema'
import { RegisterButton } from './RegisterButton'

export default function SignInForms() {
  const email = useRef('')
  const password = useRef('')
  // Login function
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(email.current + password.current)
    signIn('credentials', {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: '/',
    })
  }

  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false)
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(true)

  // Switches login visibility
  const toggleLoginFormVisibility = () => {
    setIsLoginFormVisible(!isLoginFormVisible)
    setIsRegisterFormVisible(!isRegisterFormVisible)
  }

  // Função para alternar a visibilidade do formulário de registro
  const toggleRegisterFormVisibility = () => {
    setIsRegisterFormVisible(!isRegisterFormVisible)
    setIsLoginFormVisible(!isLoginFormVisible)
  }

  console.log('Register ' + isRegisterFormVisible)
  console.log('Login ' + isLoginFormVisible)

  // Register Function

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
    <div>
      <form
        onSubmit={onSubmit}
        id="loginForm"
        className={`flex-col items-center w-[100%] gap-4 ${
          isLoginFormVisible ? '' : 'flex'
        } ${isRegisterFormVisible ? '' : 'hidden'}`}
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

        <ReCAPTCHA
          sitekey={process.env.RECAPTCHA_SITE_KEY as string}
          ref={recaptchaRef}
          onChange={handleCaptchaSubmission}
        />

        <Button type="submit">Logar</Button>

        <p>
          Precisa criar uma conta?{' '}
          <a
            href="#"
            id="formButton"
            className="text-light-secundary underline hover:text-darker-secundary font-bold"
            onClick={toggleLoginFormVisibility}
          >
            Crie aqui
          </a>{' '}
        </p>
      </form>

      {/* Register Form */}

      <form
        ref={formRef}
        action={handleFormSubmission}
        className={`flex-col w-full gap-10 ${
          isRegisterFormVisible ? '' : 'flex'
        } ${isLoginFormVisible ? '' : 'hidden'}`}
      >
        {/* <label htmlFor="name">Email</label>
        <input type="email" name="name" style={{ padding: '1rem' }} required /> */}

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
        />

        <RegisterButton isVerified={isVerified} />

        <p>
          Já possui Conta?{' '}
          <a
            href="#"
            id="formButton"
            className="text-light-secundary underline hover:text-darker-secundary font-bold"
            onClick={toggleRegisterFormVisibility}
          >
            Logue Aqui
          </a>{' '}
        </p>
      </form>
    </div>
  )
}
