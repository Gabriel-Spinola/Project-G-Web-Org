/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

'use client'

import TextBox from '../textBox'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

export default function RecoveryPassword() {
  return (
    <form className={`flex-col`}>
      <a className="hover:text-medium-secundary">
        <BsFillArrowLeftCircleFill size={32} />
      </a>
      <h1 className="md:text-base lg:text-lg x1:text-3xl mb-8 font-bold">
        {' '}
        RECUPERAR SENHA{' '}
      </h1>
      <TextBox className="w-full" labelText="E-mail" type={'email'} />
    </form>
  )
}
