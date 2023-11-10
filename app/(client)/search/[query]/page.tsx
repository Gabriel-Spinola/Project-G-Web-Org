/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import React from 'react'
import Searchbar from '../components/Searchbar'
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
    <main>
      <Searchbar />

      {!error && data ? (
        <DisplayUsers users={data} />
      ) : (
        <>Failed to load feed</>
      )}
    </main>
  )
}
