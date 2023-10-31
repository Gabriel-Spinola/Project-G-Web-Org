import { z as zod } from 'zod'
import { ESResponse } from '../types/common'

export type ExpectedData = {
  title: string
  description: string
  files: File[] | null
  images: File[] | null
}

export const dataSchema = zod.object({
  title: zod
    .string({ required_error: 'Post não pode estar vazio' })
    .min(1)
    .max(50, {
      message: 'Seu post ultrapassou o limite de caracteres (4000)',
    }),
  description: zod
    .string({ required_error: 'Post não pode estar vazio' })
    .min(1)
    .max(400, {
      message: 'Seu post ultrapassou o limite de caracteres (4000)',
    }),
  files: zod
    .any({
      invalid_type_error: 'arquivos invalidos',
    })
    .optional(),
  images: zod
    .any({
      invalid_type_error: 'imagens invalidas',
    })
    .optional(),
})

/**
 * @param formData
 * @returns Either the expected data from the form, or a ZodError object with error info
 */
export function validateForm(
  formData: FormData,
): ESResponse<FormData, zod.ZodError<ExpectedData>> {
  const parsedFormData = dataSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (!parsedFormData.success) {
    return { data: null, error: parsedFormData.error }
  }

  return { data: formData, error: null }
}
