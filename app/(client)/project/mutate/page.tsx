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
import CreateProjectFormSkeleton from '../components/skeletons/CreateProjectFormSkeleton'

export default async function CreateProject() {
  const session = await getServerSession(AuthOptions)

  if (!session) {
    return <Link href="/login">SignUp first</Link>
  }

  return (
    <main className="w-full max-w-[100vw] min-h-[calc(100vh-88px)] mt-[88px] bg-darker-white flex justify-center">
      <Suspense fallback={<CreateProjectFormSkeleton />}>
        <div className="w-full lg:w-[70%] h-full flex flex-col">
          <CreateProjectForm />
        </div>
      </Suspense>
    </main>
  )
}
