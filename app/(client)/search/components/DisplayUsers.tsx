import { User } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export default function DisplayUsers({ users }: { users: User[] }) {
  return (
    <div id="users-container">
      {users.map((user) => (
        <>
          <Link href={`/profile/${user.id}`}>Link: </Link>
          <span key={user.id}>{user.name} - </span>

          <br />
        </>
      ))}
    </div>
  )
}
