import { fetchUsers } from './_actions'
import DisplayUsers from './components/DisplayUsers'
import Searchbar from '@/components/Searchbar'

export default async function SearchPage() {
  const { data, error } = await fetchUsers()
  if (error || !data) {
    console.error(error, 'Failed to fetch users')
  }

  return (
    <main className="bg-darker-white">
      <section className="w-full flex items-center justify-center p-8">
        <Searchbar />
      </section>

      {!error && data ? (
        <DisplayUsers users={data} />
      ) : (
        <>Nenhum resultado foi encontrado</>
      )}
    </main>
  )
}
