import CreateProjectForm from '@/components/projects/CreateProjectForm'
import { Prisma } from '@prisma/client'
import { GetStaticProps } from 'next'
import { FormEvent } from 'react'

// interface Props {
//   id?: string
// }

type Props = {
  params: { id: string[] | null }
}

export default function CreateProject({ params }: Props) {
  const id = params.id ? params.id[0] : null; // Safely extract the first element

  console.log(id); // Log the extracted id

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <CreateProjectForm params={{ id }} />
    </>
  )
}