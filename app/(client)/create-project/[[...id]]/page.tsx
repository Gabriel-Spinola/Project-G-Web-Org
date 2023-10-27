/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import CreateProjectForm from '@/components/projects/CreateProjectForm'
import { getRowDataFromAPI } from '@/lib/database/actions'
import { ModelsApiCode } from '@/lib/apiConfig'
import { Project } from '@prisma/client'

type Props = {
  params: { id: string[] | null; project: Project | null }
}

async function getProjectData(id: string | null): Promise<Project | null> {
  if (!id) return null

  try {
    const response = await getRowDataFromAPI(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id,
      ModelsApiCode.Project,
    )

    if (!response.ok) throw new Error('Network response was not OK')

    const { data }: { data: Project } = await response.json()

    return data
  } catch (e: unknown) {
    // TODO: Client Response

    console.log(`error: ${e}`)
    return null
  }
}

export default async function CreateProject({ params }: Props) {
  const id: string | null = params.id ? params.id[0] : null // Safely extract the first element
  const project: Project | null = await getProjectData(id)

  console.log(project)

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />

      <CreateProjectForm params={{ id, project }} />
    </>
  )
}
