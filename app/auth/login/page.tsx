import { BgImage } from '@/components/BgImage'
import SignInForms from './components/signInForms'

export default function LoginPage() {
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
          className={`absolute flex flex-col items-center rounded-xl bg-gradient-to-tl from-medium-tertiary to-medium-primary border-solid border-2 border-light-white text-darker-white p-16`}
        >
          <SignInForms />
        </div>
      </section>
    </main>
  )
}
