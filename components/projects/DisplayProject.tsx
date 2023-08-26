'use client'

import { ModelsApiCode, ProjectModelProps } from "@/lib/database/table.types";
import { useEffect, useState } from 'react'

type Props = {
  id: string
}

export default function DisplayProject({ id }: Props) {
  const [data, setData] = useState<ProjectModelProps | null>(null);

  useEffect(function () {
    async function fetchData() {
      const response = await fetch(`/api/services/find-unique/?id=${id}&modelCode=${ModelsApiCode.Project}`, {
        method: 'POST',
      });

      if (response.ok) {
        const { data } = await response.json()

        setData(data);
      }
    }

    fetchData();
  }, [id])

  if (data != null) {
    return (
      <div className="project-container">
        <h1>{data.title}</h1>
        <span>{data.createdAt}</span>
        <p>{data.description}</p>

        {
          data.images.map((image: string) => (
            <span key={image}>Image Names: {image}</span>
          ))
        }

        <br />
      </div >
    )
  }

  return (
    <div className="project-container"></div>
  )
}