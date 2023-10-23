/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

import { BgImage } from '@/components/BgImage'
import { LogoutButton } from '@/components/debug/AuthButtons'
import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import LoginForm from '../components/LoginForm'

export default async function LoginPage() {
  const session = await getServerSession(AuthOptions)
  return (
    <main className="min-w-full flex max-w-full h-[calc(100vh-88px)]">
      <BgImage
        url={
          'https://images.unsplash.com/photo-1633354574427-b0dd0697130a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80'
        }
        alt={'SingInBgImage'}
      />
      <section
        id="loginContainer"
        className="min-w-full min-h-full flex items-center justify-center"
      >
        <div
          className={`absolute flex flex-col items-center rounded-xl bg-darker-white/75 border-solid border-2 border-light-white text-medium-gray p-16`}
        >
          {session ? (
            <>
              <LogoutButton />
            </>
          ) : (
            <>
              <LoginForm />
            </>
          )}
        </div>
      </section>
    </main>
  )
}
