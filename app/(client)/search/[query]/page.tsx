/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import React from 'react'
import Searchbar from '@/components/Searchbar'
import DisplayUsers from '../components/DisplayUsers'
import { searchForUser } from '../_actions'

type Props = {
  params: { query: string }
}

export default async function SearchPage({ params }: Props) {
  const { query } = params
  const { data, error } = await searchForUser(query)
  if (error || !data) {
    console.error(error, 'Failed to fetch users')
  }

  return (
    <main className="bg-darker-white min-h-[calc(100vh-88px)]">
      <section className="w-full flex items-center justify-center p-8">
        <div className="w-[95%] md:w-[70%] x1:w-[50%] h-12">
          <Searchbar />
        </div>
      </section>
      {!error && data ? (
        <DisplayUsers users={data} />
      ) : (
        <>Houve um erro ao pesquisar</>
      )}
    </main>
  )
}
