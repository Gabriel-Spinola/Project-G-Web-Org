/**
 * @author Gabriel Spinola Mendes da Silva
 *
 * @project Project G
 * @license GPL 3.0
 */

import { z as zod } from 'zod'
import { ESResponse } from '../types/common'

export type RegisterFormExpectedData = {
  name: string
  email: string
  password: string
}

export const registerUserDataSchema = zod
  .object({
    name: zod
      .string({
        required_error: 'Por favor insira o seu nome',
        invalid_type_error:
          'Seu nome somente não deve conter números ou caracteres inválidos',
      })
      .min(1, 'Por favor insira o seu nome')
      .max(50, 'Seu nome deve conter no máximo 50 caracteres'),
    email: zod
      .string({ required_error: 'Por favor insira o seu email' })
      .toLowerCase()
      .email({ message: 'Insira um email válido' }),
    password: zod
      .string({ required_error: 'Por favor insira o seu nome' })
      .max(64, { message: 'Sua senha deve conter no máximo 50 caracteres' })
      .min(6, { message: 'Sua senha deve conter no mínimo 6 caracteres' }),
    confirmPassword: zod
      .string({ required_error: 'Por favor insira o seu nome' })
      .max(64, { message: 'Sua senha deve conter no máximo 50 caracteres' })
      .min(6, { message: 'Sua senha deve conter no mínimo 6 caracteres' }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas informadas não batem',
        path: ['Confirme a Senha'],
      })
    }
  })

/**
 * @param formData
 * @returns Either the expected data from the form, or a ZodError object with error info
 */
export function validateRegisterForm(
  formData: FormData,
): ESResponse<
  RegisterFormExpectedData,
  zod.ZodError<RegisterFormExpectedData>
> {
  const parsedFormData = registerUserDataSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (!parsedFormData.success) {
    return { data: null, error: parsedFormData.error }
  }

  return { data: parsedFormData.data, error: null }
}
