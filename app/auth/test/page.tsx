/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from '@/components/debug/AuthButtons'
import AuthUsers from '@/components/debug/AuthUsers'
import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

import React from 'react'
import CreateProfile from '@/components/register/CreateProfile'
import { BgImage } from '@/components/bgImage'

export default async function AuthTestingPage() {
  const session = await getServerSession(AuthOptions)

  return (
    <main className="min-w-full max-w-full h-[calc(100vh-88px)]">
      <BgImage
        url={
          'https://images.unsplash.com/photo-1633354574427-b0dd0697130a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80'
        }
        alt={'SingInBgImage'}
      />
      <section className="absolute w-[90%] h-[35vh] bg-pure-white/75"></section>
    </main>
  )
}
