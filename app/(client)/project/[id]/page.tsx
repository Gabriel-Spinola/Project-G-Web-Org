/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import { Project } from '@prisma/client'
import React from 'react'
import { fetchProjectById } from '../_actions'
import { DeleteProject, UpdateProject } from '../components/TempButtons'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'

type Props = {
  params: { id: string }
}

export default async function Project({ params }: Props) {
  const { id } = params

  const session = await getServerSession(AuthOptions)
  const { data, error } = await fetchProjectById(id)
  if (error || !data) {
    console.error(error)

    return <h1>Failed to fetch data</h1>
  }

  const isOwner = session?.user.id === data.authorId

  return (
    <main>
      <h1>{data.title}</h1>

      {isOwner ? (
        <>
          <DeleteProject id={id} />
          <br />
          <UpdateProject id={id} />
        </>
      ) : (
        <></>
      )}
    </main>
  )
}
