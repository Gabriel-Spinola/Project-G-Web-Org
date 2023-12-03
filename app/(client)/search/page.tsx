import { fetchUsers } from './_actions'
import DisplayUsers from './components/DisplayUsers'
import Searchbar from '@/components/Searchbar'

export default async function SearchPage() {
  const { data, error } = await fetchUsers()
  if (error || !data) {
    console.error(error, 'Failed to fetch users')
  }

  return (
    <main className="bg-darker-white min-h-[calc(100vh-88px)] mt-[88px]">
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
