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
import LoginForm from '../components/LoginForm'
import LogoutButton from '../components/buttons/LogoutButton'

export default async function LoginPage() {
  const session = await getServerSession(AuthOptions)
  return (
    // First Wrapper Component
    <main className="min-w-full flex max-w-full h-[calc(100vh-88px)] items-center justify-center bg-darker-white">
      <section className="w-full md:w-[45%] lg:w-[30%]">
        {/* Verifies if use is logged */}
        {session ? (
          <>
            <LogoutButton />
          </>
        ) : (
          <>
            <LoginForm />
          </>
        )}
      </section>
    </main>
  )
}
