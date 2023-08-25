// REVIEW this page should be a server component.
// It should get the data from database check it, and then display the components accordingly
'use client'

import DisplayProject from '@/components/projects/DisplayProject'
import { ModelsApiCode } from '@/lib/database/table.types'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

// NOTE: Rule::Sensitive Info receive from API, other data from client
const Project = ({ params }: Props) => {
  async function deleteProjectButtonHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    const response = await fetch(`/api/services/delete/?id=${params.id}&modelCode=${ModelsApiCode.Project}`, {
      method: 'DELETE',
    });
  }

  return (
    <main>
      <DisplayProject id={params.id} />

      <button>edit</button>
      <button onClick={deleteProjectButtonHandler}>delete</button>
    </main>
  )
}

export default Project
