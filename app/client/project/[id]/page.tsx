/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import {} from 'next'
import { ModelsApiCode, ProjectModelProps } from '@/lib/database/table.types'

type Props = {
  params: { id: string }
}

const Project = ({ params }: Props) => {
  return (
    <div className="project-container">
      <h1>{params.id}</h1>

      <button>edit</button>
      <br />
      <button>delete</button>
    </div>
  )
}

export default Project
