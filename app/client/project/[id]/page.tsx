'use client'

import React, { useEffect, useState } from 'react'
import { ProjectInterface } from '@/common.types'
import { prisma } from '@/lib/database/prisma'

type Props = {
  params: {
    id: string
  }
}
// NOTE: Rule::Sensitive Info receive from API, other data from client
const Project = ({ params }: Props) => {
  const [data, setData] = useState<{
    id: string;
    title: string;
    description: string | null;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    authorId: string | null;
  } | null>(null);

  useEffect(function () {
    async function fetchData() {
      const response = await fetch(`/api/project/?id=${params.id}`, {
        method: 'POST',
      });

      if (response.ok) {
        const { data } = await response.json()

        setData(data);
      }
    }

    fetchData();
  }, [])

  console.log(data?.title)

  if (data != null) {
    return (
      <>
        <h1>{data.title}</h1>
        {/* <span>{(data.createdAt as Date).getDate()}</span> */}
        <p>{data.description}</p>
      </>
    )
  }

  return (
    <h1>Project not Found</h1>
  )
}

export default Project
