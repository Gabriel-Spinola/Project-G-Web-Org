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
import UserInfo from '@/components/profile/UserInfo';

export default async function Profile(): Promise<React.JSX.Element> {
  const variables: { name: string; title: string } = {
    name: 'Lucas Vinicius',
    title: 'Estudante de Arquitetura',
  };
  return (
    <>
      <DisplayUserInfo
        name={variables.name}
        title={variables.title}
        isOwner={true}
        user={undefined}
      />
      <div className="flex justify-around">
        <div className="flex row gap-[64px]">
          <UserPosts />
          <UserInfo
            followers={0}
            location={''}
            graduation={''}
            from={''}
            work={''}
            phone={''}
          />
        </div>
      </div>
    </>
  );
}
