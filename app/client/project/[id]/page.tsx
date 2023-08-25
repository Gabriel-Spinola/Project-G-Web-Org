'use client'

import { ModelsApiCode } from '@/lib/database/table.types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = {
  params: {
    id: string
  }
}
// NOTE: Rule::Sensitive Info receive from API, other data from client
const Project = ({ params }: Props) => {
  const [data, setData] = useState<any>(null);

  useEffect(function () {
    async function fetchData() {
      const response = await fetch(`/api/project/?id=${params.id}&modelCode=${ModelsApiCode.Project}`, {
        method: 'POST',
      });

      if (response.ok) {
        const { data } = await response.json()

        setData(data);
      }
    }

    fetchData();
  }, [])

  // function deleteProject() {
  //   const response = await fetch(`/api/project/?id=${params.id}`, {
  //     method: 'POST',
  //   });
  // }

  if (data != null) {
    return (
      <main>
        <h1>{data.title}</h1>
        <span>{data.createdAt}</span>
        <p>{data.description}</p>

        {data.images.map((image: string) => (
          <span key={image}>Image Names: {image}</span>
        ))}

        <br />

        <button>edit</button>
        {/* <button onClick={ }>delete</button> */}
      </main>
    )
  }

  return (
    <main>Project not Found</main>
  )
}

export default Project
