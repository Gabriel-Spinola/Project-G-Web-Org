import { User } from 'next-auth'
import React from 'react'

interface Params {
  user: User
}

export default function DisplayUserInfo({ user }: Params): React.JSX.Element {
  return (
    <section id="user-info">
      <h1>{user?.name}</h1>
      <h2>{user?.title || ''}</h2>
      <p>{user?.description || ''}</p>

      <br />
      <hr />
      <br />

      <h1>Linkedin: {user?.linkedinUrl || ''}</h1>
      <h1>Site: {user?.siteUrl}</h1>
      <h1>phone: {user?.contactPhone}</h1>
      <h1>email: {user?.email}</h1>
    </section>
  )
}
