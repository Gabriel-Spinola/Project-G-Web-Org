/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

export function SubmitButton({
  isVerified,
  buttonText,
}: {
  isVerified: boolean
  buttonText: string
}) {
  return (
    <button
      type="submit"
      aria-disabled={!isVerified}
      disabled={!isVerified}
      className={`text-pure-white text-2xl font-bold p-4 cursor-pointer w-full rounded-lg bg-gradient-to-tl from-medium-tertiary to-medium-primary hover:brightness-90 hover:scale-[101%]`}
    >
      {buttonText}
    </button>
  )
}
