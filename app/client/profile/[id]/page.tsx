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

export default async function Profile(): Promise<React.JSX.Element> {
  const variables: { name: string; title: string } = {
    name: 'Lucas Vinicius',
    title: 'Estudante de Arquitetura',
  }
  return (
    <>
      <DisplayUserInfo
        name={variables.name}
        title={variables.title}
        isOwner={true}
        user={undefined}
      />
      <div className="flex justify-around bg-darker-white">
        <div className="flex flex-col w-[90%] lg:w-auto lg:flex-row-reverse gap-x-8 lg:gap-x-16 ">
          <div>
            <UserInfo
              followers={100000}
              location={'Belo Horizonte'}
              graduation={'UFMG'}
              from={'Contagem'}
              work={'Senai CTTI'}
              phone={'+55 (31) 98865-4602'}
              userPrisma={undefined}
              description={'Estudo arquitetura por causa do minecraft.'}
            />
          </div>
          <UserPosts />
        </div>
      </div>
    </>
  )
}
