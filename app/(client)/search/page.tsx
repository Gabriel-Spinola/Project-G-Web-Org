import { fetchUsers } from './_actions'
import DisplayUsers from './components/DisplayUsers'
import Searchbar from './components/Searchbar'

export default async function SearchPage() {
  const { data, error } = await fetchUsers()
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
