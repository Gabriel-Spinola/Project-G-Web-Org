import { z as zod } from 'zod'

export type ExpectedData = {
  content: string
  images: File[] | null
}

export const newPostDataSchema = zod.object({
  content: zod
    .string({ required_error: 'Post não pode estar vazio' })
    .min(1)
    .max(4000, {
      message: 'Seu post ultrapassou o limite de caracteres (4000)',
    }),
})

// export function validateForm() {

// }
