/**
 * @author Gabriel Spinola Mendes da Silva
 *
 * @project Project G
 * @license GPL 3.0
 */

import { z as zod } from 'zod'
import { ESResponse } from '../types/common'
import { ESFailed, ESSucceed } from '../types/helpers'

export type ExpectedData = {
  email: string
  password: string
}

export const dataSchema = zod.object({
  email: zod
    .string({ required_error: 'Por favor insira o seu email' })
    .toLowerCase()
    .email({ message: 'Insira um email válido' }),
  password: zod
    .string({ required_error: 'Por favor insira o sua senha' })
    .max(64, { message: 'Sua senha deve conter no máximo 50 caracteres' })
    .min(6, { message: 'Sua senha deve conter no mínimo 6 caracteres' }),
})

/**
 * @param formData
 * @returns Either the expected data from the form, or a ZodError object with error info
 */
export function validateForm(
  formData: FormData,
): ESResponse<ExpectedData, zod.ZodError<ExpectedData>> {
  const parsedFormData = dataSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (!parsedFormData.success) {
    return ESFailed(parsedFormData.error)
  }

  return ESSucceed(parsedFormData.data)
}
