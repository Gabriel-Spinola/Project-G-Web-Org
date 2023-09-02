/** FIXME
 * - error TypeError: Cannot read properties of undefined (reading 'call')
    at __webpack_require__ (D:\Xampp\htdocs\Grffiti\projectg\.next\server\webpack-runtime.js:33:43)
* Also issuing about dehydration
 */

import DisplayUserInfo from '@/components/DisplayUserInfo'
import { AuthOptions } from '@/lib/auth'
import { tryGetUserDataFromApi, ResponseError } from '@/lib/database/actions'
import { Session, User, getServerSession } from 'next-auth'
import React, { Suspense } from 'react'

type Props = {
  params: { id: string }
}

async function getUserInfo(paramId: string): Promise<User | undefined> {
  const session: Session | null = await getServerSession(AuthOptions)
  const isOwner = session?.user.id === paramId

  if (!isOwner) {
    const { data } = await tryGetUserDataFromApi(paramId)

    if (data?.error == null) {
      return data
    }

    console.warn('failed to get user info', JSON.stringify(data))
    return undefined
  }

  return session?.user
}

export default async function Profile({
  params,
}: Props): Promise<React.JSX.Element> {
  const user: User | undefined = await getUserInfo(params.id)

  if (user) {
    return (
      <main className="flex min-h-screen justify-around flex-row pt-24 bg-darker-white">
        <h1>Profile Page</h1>

        <Suspense fallback={<div>Loading</div>}>
          {user && <DisplayUserInfo user={user} />}
        </Suspense>

        <hr />

        <section id="user-activities">
          <div id="user-projects"></div>
          <div id="user-posts"></div>
        </section>

        <div className="profile w-[1400px] h[208px] bg-gradient-to-r from-purple-500 to-pink-500"></div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen justify-around flex-row pt-24 bg-darker-white">
      <h1>Usuário não foi encontrado</h1>
    </main>
  )
}
