import { z as zod } from 'zod'
import { ESResponse } from '../types/common'

export type ExpectedData = {
  content: string
  images?: File[] | null
}

export const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const newPostDataSchema = zod.object({
  content: zod
    .string({ required_error: 'Post não pode estar vazio' })
    .min(1)
    .max(4000, {
      message: 'Seu post ultrapassou o limite de caracteres (4000)',
    }),
  images: zod
    .any()
    .optional()
    .refine(
      (file: File) => file.size <= MAX_FILE_SIZE,
      'O tamanho máximo de imagens é de até 5mb',
    )
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Somente images com os formatos: .jpg, .jpeg, .png and .webp são suportadas.',
    ),
})

/**
 * @param formData
 * @returns Either the expected data from the form, or a ZodError object with error info
 */
export function validateForm(
  formData: FormData,
): ESResponse<ExpectedData, zod.ZodError<ExpectedData>> {
  const parsedFormData = newPostDataSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (!parsedFormData.success) {
    return { data: null, error: parsedFormData.error }
  }

  return { data: parsedFormData.data, error: null }
}
