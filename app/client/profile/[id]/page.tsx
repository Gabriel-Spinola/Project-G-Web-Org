/** FIXME
 * - error TypeError: Cannot read properties of undefined (reading 'call')
    at __webpack_require__ (D:\Xampp\htdocs\Grffiti\projectg\.next\server\webpack-runtime.js:33:43)
* Also issuing about dehydration
 */

import UserPosts from '@/components/profile/UserPosts'
import { Box } from '@chakra-ui/react'
import DisplayUserInfo from '@/components/profile/ProfileCard'
// import { AuthOptions } from '@/lib/auth'
// import { tryGetUserDataFromApi } from '@/lib/database/actions'
// import { Session, User, getServerSession } from 'next-auth'
import React from 'react'

export default async function Profile(): Promise<React.JSX.Element> {
  const variables: { name: string } = { name: 'Lucas Vinicius' }
  return (
    <DisplayUserInfo/>
  )
}