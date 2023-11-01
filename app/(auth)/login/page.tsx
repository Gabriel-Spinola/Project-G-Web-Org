/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

import { LogoutButton } from '@/components/debug/AuthButtons'
import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import LoginForm from '../components/LoginForm'
import { StaticImage } from '@/components/Image'

export default async function LoginPage() {
  const session = await getServerSession(AuthOptions)
  return (
    // First Wrapper Component
    <main className="min-w-full flex max-w-full h-[calc(100vh-88px)] items-center justify-center bg-darker-white">
      {/* Login Container with Background Image */}
      <div
        className={`absolute flex flex-col items-center rounded-xl w-[90vw] h-[90vh]`}
      >
        {/* Background Image for Login Container */}
        <StaticImage
          className="w-[90vw] h-[90vh] rounded-xl scale-x-[-1] object-cover"
          url="https://ebqqbabyixbmiwalviko.supabase.co/storage/v1/object/public/Vampeta-Images-Public/static-images/wolfgang-hasselmann-eSLZXmnw0e8-unsplash.jpg"
          alt="House Image"
        />
        {/* Background Image darker overlay */}
        <div className="absolute w-full h-full bg-gradient-to-r from-black via-black/60 via-50% to-black/25 rounded-xl">
          {/* Form Container */}
          <div className="absolute w-full md:w-[65%] x1:w-[45%] 2x1:w-[35%] float-left h-full rounded-xl text-darker-white">
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
          </div>
        </div>
      </div>
    </main>
  )
}
