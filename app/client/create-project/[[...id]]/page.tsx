/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import CreateProjectForm from '@/components/projects/CreateProjectForm'

type Props = {
  params: { id: string[] | null }
}

export default function CreateProject({ params }: Props) {
  const id: string | null = params.id ? params.id[0] : null // Safely extract the first element

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
