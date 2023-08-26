import CreateProjectForm from '@/components/projects/CreateProjectForm'

type Props = {
  params: { id: string[] | null }
}

export default function CreateProject({ params }: Props) {
  const id = params.id ? params.id[0] : null; // Safely extract the first element

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