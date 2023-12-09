import { Suspense } from 'react'
import { fetchUsers } from './_actions'
import DisplayUsers from './_components/DisplayUsers'
import Loader from '@/components/Loader'

export default async function SearchPage() {
  const { data, error } = await fetchUsers()

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
