/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import { Project } from '@prisma/client'

type Props = {
  params: { id: string[] | null; project: Project | null }
}

export default async function CreateProject({ params }: Props) {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  )
}
