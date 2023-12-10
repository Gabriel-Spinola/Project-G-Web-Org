import Loader from '@/components/Loader'
import { ProjectType } from '@/lib/types/common'
import React, { Suspense } from 'react'
import { DeleteProject } from '../components/DeleteProjectButton'
import { UpdateProject } from '../components/UpdateProjectButton'
import dynamic from 'next/dynamic'

const DynamicImagesCarousel = dynamic(
  () => import('../components/ProjectImages'),
)

export default function ProjectSection({
  data,
  isOwner,
  id,
}: {
  data: ProjectType | null
  isOwner: boolean
  id: string
}) {
  return (
    <section className="w-full md:w-[90%] x1:w-[60%] flex flex-col md:px-8">
      <h1 className="w-full flex text-2xl md:text-4xl font-semibold justify-between p-8 md:px-0">
        <Suspense fallback={<Loader />}>
          {data?.title}

          {isOwner && (
            <section className="flex w-[10%]">
              <UpdateProject id={id} />
              <DeleteProject id={id} />
            </section>
          )}
        </Suspense>
      </h1>

      <Suspense fallback={<Loader />}>
        {data?.images && data?.author && (
          <DynamicImagesCarousel
            imagesSrc={data.images}
            projectOwner={data.authorId}
          />
        )}
      </Suspense>

      <Suspense fallback={<Loader />}>
        <article className="pt-16 text-lg">{data?.description}</article>
      </Suspense>
    </section>
  )
}
