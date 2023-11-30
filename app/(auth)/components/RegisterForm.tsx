'use client'

import React, { useRef } from 'react'
import TextBox from './TextBox'
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitButton } from './buttons/SubmitButton'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { validateRegisterForm } from '@/lib/schemas/userRegistering.schema'
import { buildValidationErrorMessage } from '@/lib/schemas/actions'
import { useCaptcha } from '@/hooks/useCaptcha'
import { ESResponse } from '@/lib/types/common'
import { toast } from 'react-toastify'
import { registerNewUser } from '../_actions'

export default function RegisterForm() {
  const formRef = useRef<HTMLFormElement>(null)

  const { ref: captchaRef, isVerified, handleCaptchaSubmission } = useCaptcha()

  async function handleFormSubmission(formData: FormData): Promise<void> {
    const validatedForm = validateRegisterForm(formData)

    if (validatedForm.error) {
      return buildValidationErrorMessage(validatedForm.error, (errorMessage) =>
        toast.warn(
          'Preencha o formulário corretamente.\n' + errorMessage + '\n',
        ),
      )
    }

    const { error }: ESResponse<string> = await toast.promise(
      registerNewUser(validatedForm.data),
      {
        pending: 'Estamos te registrando... 🥱',
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
    <form
      ref={formRef}
      id="auth-form"
      action={handleFormSubmission}
      className={`flex flex-col justify-evenly w-full h-full gap-4 items-center text-pure-white`}
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

      <TextBox
        className="w-full"
        labelText="Confime a senha"
        htmlForId="confirmPassword"
        type={'password'}
      />

      <ReCAPTCHA
        sitekey={process.env.RECAPTCHA_SITE_KEY as string}
        ref={captchaRef}
        onChange={handleCaptchaSubmission}
      />

      <div id="submitRegiter" className="flex w-full gap-4">
        <SubmitButton isVerified={isVerified} buttonText={'REGISTRAR'} />

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
  )
}
