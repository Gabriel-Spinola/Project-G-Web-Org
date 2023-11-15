/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import { Suspense } from 'react'
import Link from 'next/link'
import CreateProjectForm from '../components/CreateProjectForm'

export default async function CreateProject() {
  const session = await getServerSession(AuthOptions)

  if (!session) {
    return <Link href="/login">SignUp first</Link>
  }

  return (
    <main>
      <Suspense fallback={<div>loading...</div>}>
        <CreateProjectForm />
      </Suspense>
    </main>
  )
}
