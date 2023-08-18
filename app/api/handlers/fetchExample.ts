import next from 'next'

// Use Suspense to load single components

type APIExample = {
  login: string
  id: string
}

export async function FetchExample(): Promise<APIExample> {
  // reload and fetch the data in 30 30 seconds
  //   const response = await fetch('https://api.github.com/users/diego3g', {
  //     next: { revalidate: 30 },
  //   })

  // when doing more than 1 fetch, use Promise.All([fetch1, fetch2, ...]) (only when they don't depend on each other)

  const response = await fetch('https://api.github.com/users/diego3g', {
    cache: 'no-store', // makes a different call of each client (SSR)
  })

  const user: APIExample = await response.json()

  return user
}
