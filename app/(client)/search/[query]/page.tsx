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
import { API_URL, API_ENDPOINTS } from '@/lib/apiConfig'
import { User } from '@prisma/client'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'

type Props = {
  params: { query: string }
}

async function fetchUsers(id: string): Promise<User[] | null> {
  try {
    const response = await fetch(`${API_URL}${API_ENDPOINTS.services.users}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.API_SECRET as string,
      },
      next: { tags: ['user-data'] },
    })

    if (!response.ok) {
      const { data }: { data: string } = await response.json()

      throw new Error('Response not ok ' + data)
    }

    const { data }: { data: User[] } = await response.json()

    return data
  } catch (error: unknown) {
    console.error(error, 'Failed to fetch users')

    return null
  }
}

export default async function SearchPage({ params }: Props) {
  const { query } = params
  const data = await fetchUsers(query)
  const error = null
  console.log(data)

  return (
    <main>
      <Searchbar />

      {!error ? (
        <>{data && data.map((user) => <span key={user.id}>{user.id}</span>)}</>
      ) : (
        <h1>Failed to load user</h1>
      )}
    </main>
  )
}
