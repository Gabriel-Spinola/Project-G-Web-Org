import Loader from '@/components/Loader'
import Link from 'next/link'
import { ReactNode, Suspense } from 'react'
import { getUserData } from '../../../_actions'
import Avatar from '@/components/Avatar'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'

export default async function SettingsLayout({
  exhibition,
  security,
  params,
}: {
  exhibition: ReactNode
  security: ReactNode
  params: { id: string; type: 'exhibition' | 'security' }
}) {
  const { id, type } = params

  // NOTE - the user data is cached in all states (so it won't change even if we change between the two parellel pages)
  const userData = await getUserData(id)

  return (
    <main className="w-full min-h-[calc(100vh-88px)] mt-[88px] bg-darker-white flex">
      <aside className="w-full md:w-[35vw] x1:w-[30vw] h-[calc(100vh-88px)] py-16 shadow-xl bg-medium-white">
        <section
          id="user-info"
          className="flex items-center gap-4 px-4 lg:px-8"
        >
          <Suspense fallback={<Loader />}>
            <Avatar
              size={'xl'}
              imageUrl={getProfilePicURL({
                profilePic: userData?.profilePic as string | null,
                image: userData?.image as string | null,
              })}
            />
          </Suspense>

          <Suspense fallback={<Loader />}>
            <h1 className="text-xl lg:text-2xl text-medium-primary font-semibold">
              {userData?.name}
            </h1>
          </Suspense>
        </section>

        <ul className="flex flex-col py-16 text-xl gap-1">
          <li>
            <Link
              href={`/profile/${id}/user-settings/exhibition/`}
              className="hover:text-medium-primary hover:bg-darker-white w-full flex justify-start  px-4 lg:px-8 py-4"
            >
              Exibição
            </Link>
          </li>

          <hr />

          <li>
            <Link
              href={`/profile/${id}/user-settings/security/`}
              className="hover:text-medium-primary hover:bg-darker-white w-full flex justify-start  px-4 lg:px-8 py-4"
            >
              Segurança
            </Link>
          </li>
        </ul>
      </aside>

      {type === 'exhibition' ? exhibition : security}
    </main>
  )
}
