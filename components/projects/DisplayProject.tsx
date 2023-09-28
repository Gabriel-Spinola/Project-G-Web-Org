/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProjectModelProps } from './CreateProjectForm'
import { ModelsApiCode } from '@/lib/apiConfig'

type Props = {
  id: string
}

export default function DisplayProject({ id }: Props) {
  const router = useRouter()
  const [data, setData] = useState<ProjectModelProps | null>(null)

  async function deleteProjectButtonHandler(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault()

    const response = await fetch(
      `/api/services/delete/?id=${id}&modelCode=${ModelsApiCode.Project}`,
      {
        method: 'DELETE',
      },
    )

    if (response.ok) {
      router.push('/')
    } else {
      console.log('Deletion Failed')
    }
  }

  useEffect(
    function () {
      async function fetchData() {
        const response = await fetch(
          `/api/services/find-unique/?id=${id}&modelCode=${ModelsApiCode.Project}`,
          {
            method: 'POST',
          },
        )

        if (response.ok) {
          const { data } = await response.json()

          setData(data)
        }
      }

      fetchData()
    },
    [id],
  )

  if (data != null) {
    return (
      <div className="project-container">
        <h1>{data.title}</h1>
        <span>{data.createdAt}</span>
        <p>{data.description}</p>

        {data.images.map((image: string) => (
          <span key={image}>Image Names: {image}</span>
        ))}

        <br />
        <br />

        <button>edit</button>
        <br />
        <button onClick={deleteProjectButtonHandler}>delete</button>
      </div>
    )
  }

  return <div className="project-container"></div>
}
