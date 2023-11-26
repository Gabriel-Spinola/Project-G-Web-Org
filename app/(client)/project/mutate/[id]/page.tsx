/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import CreateProjectForm from '../../components/CreateProjectForm'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import { Suspense } from 'react'
import Link from 'next/link'
import { fetchProjectById } from '../../_actions'
import CreateProjectFormSkeleton from '../../components/skeletons/CreateProjectFormSkeleton'

type Props = {
  params: { id: string }
}

export default async function CreateProject({ params }: Props) {
  const { id } = params
  const session = await getServerSession(AuthOptions)

  if (!session) {
    return <Link href="/login">SignUp first</Link>
  }

  const { data, error } = await fetchProjectById(id)
  if (error || !data) {
    console.error(error)

    return <h1>Failed to fetch data</h1>
  }

  return (
    <main>
      <Suspense fallback={<CreateProjectFormSkeleton />}>
        <CreateProjectForm
          projectId={id}
          content={{ ...data }}
          projectImages={data.images}
        />
      </Suspense>
    </main>
  )
}
