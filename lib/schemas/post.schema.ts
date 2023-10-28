import { z as zod } from 'zod'
import { ESResponse } from '../types/common'
import { ESFailed, ESSucceed } from '../types/helpers'

export type ExpectedData = {
  content: string
  images?: File[] | null
}

export const newPostDataSchema = zod.object({
  content: zod
    .string({ required_error: 'Post não pode estar vazio' })
    .min(1)
    .max(4000, {
      message: 'Seu post ultrapassou o limite de caracteres (4000)',
    }),
  images: zod
    .any({
      invalid_type_error: 'imagem inválida',
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
  const parsedFormData = newPostDataSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (!parsedFormData.success) {
    return ESFailed(parsedFormData.error)
  }

  return ESSucceed(formData)
}
