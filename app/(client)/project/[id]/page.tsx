/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import React from 'react'

type Props = {
  params: { id: string }
}

export default function Project({ params }: Props) {
  const { id } = params

  return <div>Project</div>
}
