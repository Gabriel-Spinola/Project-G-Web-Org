import { verifyCaptcha } from '@/server/captchaActions'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'react-toastify'

export function useCaptcha() {
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const ref = useRef<ReCAPTCHA>(null)

  async function handleCaptchaSubmission(token: string | null): Promise<void> {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsVerified(true))
      .catch(() => {
        setIsVerified(false)

        toast.warn('Por favor, preencha o captcha corretamente')
      })
  }

  return { ref, isVerified, handleCaptchaSubmission }
}
