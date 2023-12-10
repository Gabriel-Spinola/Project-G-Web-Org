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
import Loader from '@/components/Loader'
import { DeleteProject } from '../components/DeleteProjectButton'
import { UpdateProject } from '../components/UpdateProjectButton'
import ProjectImagesCarousel from '../components/ProjectImages'

type Props = {
  params: { id: string }
}

export default async function Project({ params }: Props) {
  const { id } = params

  const session = await getServerSession(AuthOptions)
  const { data, error } = await fetchProjectById(id)
  if (error || !data) {
    console.error(error)

    return <h1>Failed to fetch data</h1>
  }

  const isOwner = session?.user.id === data.authorId

  return (
    <main className="mt-[88px] min-h-[calc(100vh-88px)] w-full flex justify-center bg-darker-white">
      <section className="w-full md:w-[90%] x1:w-[60%] flex flex-col md:px-8">
        <h1 className="w-full flex text-2xl md:text-4xl font-semibold justify-between p-8 md:px-0">
          {data.title}
          <Suspense fallback={<Loader />}>
            {isOwner && (
              <section className="flex w-[10%]">
                <UpdateProject id={id} />
                <DeleteProject id={id} />
              </section>
            )}
          </Suspense>
        </h1>

        <ProjectImagesCarousel
          imagesSrc={data.images}
          projectOwner={data.authorId}
        />

        <article className="pt-16 text-lg">{data.description}</article>
      </section>
    </main>
  )
}
