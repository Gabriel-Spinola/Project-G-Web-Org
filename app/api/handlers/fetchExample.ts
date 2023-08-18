type APIExample = {
  login: string
  id: string
}

export async function FetchExample(): Promise<APIExample> {
  const response = await fetch('https://api.github.com/users/diego3g')
  const user: APIExample = await response.json()

  return user
}
