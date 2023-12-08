/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import LogoutButton from '../components/buttons/LogoutButton'
import LoginForm from '../components/LoginForm'

export default async function LoginPage() {
  const session = await getServerSession(AuthOptions)

  return (
    <section className="w-full md:w-auto lg:w-[30vw] h-full md:h-auto md:max-h-[80vh] rounded-lg drop-shadow-[0_35px_35px_rgba(0,0,0,0.35)] bg-black/10 backdrop-blur-md p-8">
      <Suspense fallback={<>Carregando...</>}>
        {session ? (
          <>
            <LogoutButton />
          </>
        ) : (
          <>
            <h1 className="text-xl md:text-xl lg:text-4xl font-bold text-center text-pure-white pb-4">
              LOGIN
            </h1>
            <LoginForm />
          </>
        )}
      </Suspense>
    </section>
  )
}
