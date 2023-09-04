/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import { useSession } from 'next-auth/react'

export default function Explore() {
  const { data: session } = useSession()

  return (
    <main>
      <h1>{session?.user?.name}</h1>
    </main>
  )
}
