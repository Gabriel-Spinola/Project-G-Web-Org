import React, { Suspense } from 'react'
import { fetchProjects } from '../../project/_actions'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/lib/auth'
import { fetchPosts } from '@/app/(feed)/_actions'
import ProfileFeed from './ProfileFeed'

type Props = { authorId: string; isOwner: boolean }

export default async function ProfileFeedController({
  authorId,
  isOwner,
}: Props) {
  const { data: projects, error: projectError } = await fetchProjects(
    1,
    undefined,
    authorId,
  )
  const { data: posts, error: postError } = await fetchPosts(
    1,
    undefined,
    authorId,
  )
  const session = await getServerSession(AuthOptions)

  if (projectError || postError) {
    return <>Failed to load feed</>
  }

  return (
    <Suspense fallback={<>loading feed</>}>
      <ProfileFeed
        startupProjects={projects ?? undefined}
        startupPosts={posts ?? undefined}
        currentUserId={session?.user.id}
        authorId={authorId}
        isOwner={isOwner}
      />
    </Suspense>
  )
}
