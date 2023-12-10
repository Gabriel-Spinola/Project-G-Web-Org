/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import React, { Suspense } from 'react'
import { fetchProjectById } from '../_actions'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import ProjectSection from '../_components/ProjectSection'
import Loader from '@/components/Loader'

type Props = {
  params: { id: string }
}

export default async function Project({ params }: Props) {
  const { id } = params

  const session = await getServerSession(AuthOptions)
  const { data, error } = await fetchProjectById(id)

  const isOwner = session?.user.id === data?.authorId

  return (
    <main className="mt-[88px] min-h-[calc(100vh-88px)] w-full flex justify-center bg-darker-white">
      <Suspense fallback={<Loader />}>
        {!error ? (
          <ProjectSection data={data} isOwner={isOwner} id={id} />
        ) : (
          <h2>Houve um erro ao carregar o projeto.</h2>
        )}
      </Suspense>
    </main>
  )
}
