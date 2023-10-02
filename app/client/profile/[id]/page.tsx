/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

/** FIXME
 * - error TypeError: Cannot read properties of undefined (reading 'call')
    at __webpack_require__ (D:\Xampp\htdocs\Grffiti\projectg\.next\server\webpack-runtime.js:33:43)
* Also issuing about dehydration
 */

import UserPosts from '@/components/profile/UserPosts'
import DisplayUserInfo from '@/components/profile/ProfileCard'
// import { AuthOptions } from '@/lib/auth'
// import { tryGetUserDataFromApi } from '@/lib/database/actions'
// import { Session, User, getServerSession } from 'next-auth'
import React from 'react'
import UserInfo from '@/components/profile/UserInfo'
import { User } from '@prisma/client'
import { AuthOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { getUserData } from '../server-actions'

type Props = {
  params: { id: string }
}

export default async function Profile({
  params,
}: Props): Promise<React.JSX.Element> {
  const user: Partial<User> | null = await getUserData(params.id, {
    id: true,
    name: true,
    title: true,
    graduations: true,
    location: true,
  })

  if (user) {
    const session = await getServerSession(AuthOptions)
    const isOwner = session?.user.id === user?.id

    return (
      <>
        <DisplayUserInfo user={user} isOwner={isOwner} />

        <div className="flex justify-around bg-darker-white">
          <div className="flex flex-col w-[90%] lg:w-auto lg:flex-row-reverse gap-x-8 lg:gap-x-16 ">
            <UserInfo
              isOwner={isOwner}
              followers={100000}
              location={user.location ?? 'Contagem'}
              graduation={user.graduations?.at(0) ?? 'UFMG'}
              from={user.location ?? 'Minas Gerais - Brasil'}
              work={'Senai CTTI'}
              phone={user.contactPhone?.toString() ?? '+55 31 97300-8566'}
              description={
                user.description ?? 'Estudo arquitetura por causa do minecraft'
              }
            />

            <UserPosts authorID={params.id} />
          </div>
        </div>
      </>
    )
  }

  return <h1>User not found</h1>
}
