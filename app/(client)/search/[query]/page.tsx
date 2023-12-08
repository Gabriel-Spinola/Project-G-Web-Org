/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import React, { Suspense } from 'react'
import DisplayUsers from '../_components/DisplayUsers'
import { searchForUser } from '../_actions'
import Loader from '@/components/Loader'

type Props = {
  params: { query: string }
}

export default async function SearchPage({ params }: Props) {
  const { query } = params
  const { data, error } = await searchForUser(query)

  return (
    <Suspense fallback={<Loader />}>
      {!error ? (
        <>
          {data && data.length > 0 ? (
            <DisplayUsers users={data} />
          ) : (
            <h2>Nenhum usuário encontrado</h2>
          )}
        </>
      ) : (
        <>Houve um erro ao pesquisar</>
      )}
    </Suspense>
  )
}
