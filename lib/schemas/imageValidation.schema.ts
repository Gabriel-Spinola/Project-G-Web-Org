import { ESResponse } from '../types/common'
import { ESFailed } from '../types/helpers'

// NOTE - 5mb
export const MAX_FILE_SIZE = 5000000

/**
 * Validate function design to validate post images at runtime.
 *
 * @param file the file you wisth to validate
 * @param qtyImages the length of the files array given from the input
 * @returns nothing if passed and error if failed
 */
export function validateImageInput(
  file: File,
  qtyImages?: number,
): ESResponse<never, string> {
  // const specialCharacters = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
  const notLatin = '/[\\p{IsLatin}]+$'
  const notPunctuated = '[^\x00-\x7F]|[áç]'

  if (file.name.match(notLatin) || file.name.match(notPunctuated)) {
    return ESFailed(
      'Nome do arquivo é inválido. (Ex.: Contém letras fora do alfabeto latim)',
    )
  }

  // REVIEW - Special characters
  // if (file.name.match(invalidCharacters)) {
  //   return 'Nome do arquivo é inválido. (Ex.: Contém letras fora do alfabeto latim)'
  // }

  if (file.size > MAX_FILE_SIZE) {
    return ESFailed('O tamanho máximo de arquivos é de 5mb')
  }

  if (qtyImages && qtyImages >= 3) {
    return ESFailed('O número máximo de imagens por post é 3')
  }

  return {} as never
}
