import React from 'react'
import { ProjectInterface } from '@/common.types'

const Project = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <main>
      <h1>Project {id}</h1>
    </main>
  )
}

export default Project
