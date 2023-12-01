/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import React from 'react'
import { BgImage } from '@/components/BgImage'
import { StaticImage } from '@/components/Image'
import TextBox from '../components/elements/textBox'
import Button from '../components/elements/button'

const LoginPage = () => {
  return (
    <main className="min-w-full max-w-full h-[calc(100vh-88px)]">
      <BgImage
        url={
          'https://images.unsplash.com/photo-1633354574427-b0dd0697130a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80'
        }
        alt={'SingInBgImage'}
      />
      <section className="absolute flex mx-[5%] my-[calc((100vh-88px-75vh)/2)] w-[90%] lg:w-[65%] lg:mx-[17.5%] h-[75vh] rounded-xl bg-pure-white/75">
        <section id="login-section" className="w-[50%] h-full">
          <h1>Login</h1>
          <TextBox labelText="E-mail" type={'email'} />
          <TextBox labelText="Senha" type={'password'} />
          <Button>Logar</Button>
          <p>
            Precisa criar uma conta?{''}
            <a href="/">Crie aqui</a> {''}
          </p>
        </section>
        <section
          id="image-section"
          className="flex w-[50%] h-[100%] py-[2.5%] rounded-xl ml-[10vh]"
        >
          <StaticImage
            url={
              'https://ebqqbabyixbmiwalviko.supabase.co/storage/v1/object/public/Vampeta-Images-Public/static-images/singin-image.png'
            }
            alt={'Sing-in Image'}
            className={'w-full h-full object-cover rounded-xl'}
          />
        </section>
      </section>
    </main>
  )
}
export default LoginPage
