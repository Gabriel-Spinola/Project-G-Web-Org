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
import { fetchProject } from '../_actions'
import { DeleteProject, UpdateProject } from '../components/TempButtons'

type Props = {
  params: { id: string }
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

      <br />
      <br />
      <DeleteProject id={id} />
      <br />
      <UpdateProject id={id} />
    </main>
  )
}
