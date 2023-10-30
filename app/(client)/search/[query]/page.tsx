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

type Props = {
  params: { query: string }
}

export default function SearchPage({ params }: Props) {
  const { query } = params

  return (
    <main>
      <Searchbar />
    </main>
  )
}
