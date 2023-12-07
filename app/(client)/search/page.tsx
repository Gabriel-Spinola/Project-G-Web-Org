import { Suspense } from 'react'
import { fetchUsers } from './_actions'
import DisplayUsers from './components/DisplayUsers'
import Searchbar from '@/components/Searchbar'

export default async function SearchPage() {
  const { data, error } = await fetchUsers()

  return (
    <main className="bg-darker-white min-h-[calc(100vh-88px)] mt-[88px]">
      <section className="w-full flex items-center justify-center p-8">
        <div className="w-[95%] md:w-[70%] x1:w-[50%] h-12">
          <Searchbar />
        </div>
      </section>

      <Suspense fallback={<h2>Carregando...</h2>}>
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
    </main>
  )
}
