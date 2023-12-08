/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

import StaticImage from '@/components/Image'
import RegisterForm from '../components/RegisterForm'
import LogoutButton from '../components/buttons/LogoutButton'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'

export default async function RegisterPage() {
  const session = await getServerSession(AuthOptions)

  return (
    // First Wrapper Component
    <main className="relative min-w-full flex max-w-full h-[calc(100vh-88px)] mt-[88px] items-center justify-center bg-darker-white">
      <StaticImage
        className="absolute w-full h-full object-cover"
        url="/assets/explore/photo-1591874204276-1ebd20fb8db6.webp"
        alt="imagem"
        fill={true}
      />

      <section className="w-full md:w-auto lg:w-[30vw] h-full md:h-auto md:max-h-[80vh] rounded-lg drop-shadow-[0_35px_35px_rgba(0,0,0,0.35)] bg-black/10 backdrop-blur-md p-8">
        {session ? (
          <>
            <LogoutButton />
          </>
        ) : (
          <>
            <h1 className="text-xl md:text-xl lg:text-4xl font-bold text-center text-pure-white pb-4">
              CRIE UMA CONTTA
            </h1>
            <RegisterForm />
          </>
        )}
      </section>
    </main>
  )
}
