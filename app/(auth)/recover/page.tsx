/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license GPL 3.0
 */

'use client'

import RecoverForm from '../components/RecoverForm'

export default function RecoverPage() {
  return (
    <main className="min-w-full flex max-w-full h-[calc(100vh-88px)] items-center justify-center bg-darker-white">
      {/* Form Container */}
      <div className="w-full md:w-[45%] lg:w-[30%] max-h-[60%] flex flex-col items-center justify-center rounded-xl text-medium-primary bg-black/75 border-4 border-medium-gray p-4">
        <h1 className="md:text-base lg:text-lg x1:text-3xl mb-8 font-bold">
          {' '}
          RECUPERAR SENHA{' '}
        </h1>
        <RecoverForm />
      </div>
    </main>
  )
}
