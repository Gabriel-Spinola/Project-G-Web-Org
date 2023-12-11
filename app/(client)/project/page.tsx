import React, { Suspense } from 'react'
import { fetchProjects } from './_actions'
import ProjectFeed from './components/ProjectFeed'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import { isProfissionalAccount } from '@/lib/auth/actions'
import Link from 'next/link'

export default async function Projects() {
  const { data: projects, error } = await fetchProjects()
  const session = await getServerSession(AuthOptions)

  if (error || !projects) {
    return <>Failed to load projects</>
  }

  return (
    <main className="max-w-screen min-w-full min-h-[calc(100vh-88px)] mt-[88px] bg-darker-white flex justify-center">
      <div className="w-full md:w-[70%]">
        <Suspense fallback={<span>Loading feed...</span>}>
          <ProjectFeed
            initialPublication={projects ?? undefined}
            currentUserId={session?.user.id}
            newProjectLink={
              <>
                {isProfissionalAccount(session) && (
                  <Link
                    href={'/project/mutate'}
                    className="mt-8 w-full bg-darker-gray px-8 py-8 rounded-lg text-darker-white text-xl hover:scale-[101%]"
                  >
                    Crie um Projeto
                  </Link>
                )}
              </>
            }
          />
        </Suspense>
      </div>
    </main>
  )
}
