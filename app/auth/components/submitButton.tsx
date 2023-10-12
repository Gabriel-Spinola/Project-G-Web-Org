/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export function SubmitButton({
  isVerified,
  buttonText,
}: {
  isVerified: boolean
  buttonText: string
}) {
  // NOTE - Gathers the current form status
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      aria-disabled={pending || !isVerified}
      disabled={pending || !isVerified}
      className={`text-black p-4 cursor-pointer w-full rounded-lg`}
      style={{
        backgroundColor: `${pending ? '#ccc' : '#fff'}`,
      }}
    >
      {pending ? 'Carregando' : buttonText}
    </button>
  )
}
