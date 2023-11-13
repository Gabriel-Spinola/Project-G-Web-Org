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
import {
  SUPABASE_PUBLIC_BUCKET_NAME,
  getProjectImageUrl,
  supabase,
} from '@/lib/storage/supabase'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'

type Props = {
  params: { id: string }
}

async function getImageFiles(
  projectId: string,
  paths: string[],
): Promise<ESResponse<File[]>> {
  try {
    const files = await Promise.all(
      paths.map(async (path: string) => {
        console.log(getProjectImageUrl(path))
        const { data, error } = await supabase.storage
          .from(SUPABASE_PUBLIC_BUCKET_NAME)
          .download(`projects/${projectId}/images/${path}`)

        if (error) {
          console.error(error)

          throw new Error('failed to get image')
        }

        return data as File
      }),
    )

    return ESSucceed(files)
  } catch (error: unknown) {
    return ESFailed(error)
  }
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

  const images = await getImageFiles(session.user.id, data.images)
  if (images.error) {
    console.error('image failed: ' + error)
  }

  return (
    <main>
      <Suspense fallback={<div>loading...</div>}>
        <CreateProjectForm
          currentUserId={session.user.id}
          content={{ ...data }}
          projectImages={data.images}
        />
      </Suspense>
    </main>
  )
}
