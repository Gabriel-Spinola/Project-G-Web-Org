import { z as zod } from 'zod'
import { ESResponse } from '../types/common'
import { ESFailed, ESSucceed } from '../types/helpers'

export type ExpectedData = {
  content: string
}

export const dataSchema = zod.object({
  content: zod
    .string({ required_error: 'Post não pode estar vazio' })
    .min(2)
    .max(1000, {
      message: 'Seu comentario ultrapassou o limite de caracteres (1000)',
    }),
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
    return ESFailed(parsedFormData.error)
  }

  return ESSucceed(formData)
}
