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
import { API_URL } from '@/lib/apiConfig'
import { User } from '@prisma/client'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'

type Props = {
  params: { query: string }
}

async function fetchUsers(query: string): Promise<ESResponse<User[]>> {
  try {
    const response = await fetch(
      `${API_URL}api/services/users/search/${query}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.API_SECRET as string,
        },
        next: { tags: ['user-data'] },
      },
    )

    if (!response.ok) {
      const { data }: { data: string } = await response.json()

      throw new Error('Response not ok ' + data)
    }

    const { data }: { data: User[] } = await response.json()

    return ESSucceed(data)
  } catch (error: unknown) {
    return ESFailed(error)
  }
}

export default async function SearchPage({ params }: Props) {
  const { query } = params
  const { data, error } = await fetchUsers(query)
  if (error || !data) {
    console.error(error, 'Failed to fetch users')
  }

  return (
    <main>
      <Searchbar />

      {!error ? (
        <>
          {data &&
            data.map((user) => <span key={user.id}>{user.name} - </span>)}
        </>
      ) : (
        <h1>Failed to load user</h1>
      )}
    </main>
  )
}
