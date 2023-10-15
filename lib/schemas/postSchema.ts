import { z as zod } from 'zod'
import { ESResponse } from '../types/common'

export type ExpectedData = {
  content: string
  images?: File[] | null
}

// NOTE - 5mb
export const MAX_FILE_SIZE = 5000000
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
    .any({
      invalid_type_error: 'caracteres inválidos',
    })
    .optional(),
})

export function validateImageInput(
  file: File,
  qtyImages?: number,
): ESResponse<never> {
  const specialCharacters = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
  const notLatin = '/[\\p{IsLatin}]+$'

  const notPunctuated = '[^\x00-\x7F]|[áç]'

  console.log(file.size)

  if (file.name.match(notLatin) || file.name.match(notPunctuated)) {
    return {
      data: null,
      error:
        'Nome do arquivo é inválido. (Ex.: Contém letras fora do alfabeto latim)',
    }
  }

  // REVIEW - Special characters
  // if (file.name.match(invalidCharacters)) {
  //   return 'Nome do arquivo é inválido. (Ex.: Contém letras fora do alfabeto latim)'
  // }

  if (file.size > MAX_FILE_SIZE) {
    return { data: null, error: 'O tamanho máximo de arquivos é de 5mb' }
  }

  if (qtyImages && qtyImages >= 3) {
    return { data: null, error: 'O número máximo de imagens por post é 3' }
  }

  return { data: null, error: null }
}

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
    return { data: null, error: parsedFormData.error }
  }

  return { data: formData, error: null }
}
