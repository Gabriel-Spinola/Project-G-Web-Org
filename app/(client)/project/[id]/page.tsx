/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'
import { Project } from '@prisma/client'
import React from 'react'

type Props = {
  params: { id: string }
}

async function fetchProject(id: string): Promise<ESResponse<Project>> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.projects}only/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.API_SECRET as string,
        },
        next: { tags: ['revalidate-project'] },
      },
    )

    if (!response.ok) {
      const { data }: { data: string } = await response.json()

      throw new Error("Response's not ok: " + data)
    }

    const { data }: { data: Project } = await response.json()

    return ESSucceed(data)
  } catch (error: unknown) {
    return ESFailed(error)
  }
}

export default async function Project({ params }: Props) {
  const { id } = params

  const { data, error } = await fetchProject(id)
  if (error || !data) {
    console.error(error)

    return <h1>Failed to fetch data</h1>
  }

  return (
    <main>
      <h1>{data.title}</h1>
    </main>
  )
}
