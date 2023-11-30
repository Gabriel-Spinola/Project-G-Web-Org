'use client'

import Link from 'next/link'
import React, { useRef } from 'react'
import { SubmitButton } from './SubmitButton'
import TextBox from './TextBox'
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { useCaptcha } from '@/hooks/useCaptcha'

export default function RecoverForm() {
  const email = useRef('')

  const { ref: captchaRef, isVerified, handleCaptchaSubmission } = useCaptcha()

  async function handleRecoverySubmission(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const signInResponse = await toast.promise(
      signIn('email', {
        email: email.current,
        redirect: false,
      }),
      { pending: 'Enviando email....🥱' },
    )

    if (signInResponse) {
      if (signInResponse.error) {
        toast.error(
          'Falha ao enviar email, certifique-se de que suas informações estão corretas.',
        )

        console.error(signInResponse.error)

        return
      }
    }

    toast('Email enviado faça login por ele!')
  }
  return (
    <form
      id="auth-form"
      className={`flex flex-col items-center justify-center w-full h-full gap-4`}
      onSubmit={handleRecoverySubmission}
    >
      <TextBox
        className="w-full text-pure-white"
        labelText="E-mail"
        type={'email'}
        onChange={(e) => (email.current = e.target.value)}
      />

      <ReCAPTCHA
        sitekey={process.env.RECAPTCHA_SITE_KEY as string}
        ref={captchaRef}
        onChange={handleCaptchaSubmission}
        className="my-4"
      />

      <SubmitButton
        isVerified={isVerified}
        buttonText={'ENVIAR E-MAIL DE RECUPERAÇÃO'}
      />

      <p className="text-center text-pure-white drop-shadow-[0_01px_01px_rgba(0,0,0,0.35)]">
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
  )
}
