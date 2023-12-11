import Avatar from '@/components/Avatar'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import { User } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export default function DisplayUsers({
  users,
}: {
  users: Partial<User>[] | null
}) {
  return (
    <section
      id="users-container"
      className="w-full flex flex-col items-center justify-center pt-12 gap-4"
    >
      {users?.map((user) => (
        // NOTE - USER CARD
        <section
          key={user.id}
          className="w-full flex justify-between md:w-[80%] lg:w-[65%] x1:w-[48%] px-4 py-4 bg-medium-gray text-medium-white rounded-xl"
        >
          {/* USER INFO */}
          <div className="flex gap-4">
            <Link href={`/profile/${user.id}`} className="hover:brightness-75">
              <Avatar
                size="lg"
                imageUrl={getProfilePicURL({
                  image: user.image || null,
                  profilePic: user.profilePic || null,
                })}
              />
            </Link>

            <section className="flex flex-col justify-between">
              <Link href={`/profile/${user.id}`}>
                <span
                  key={user.id}
                  className="hover:text-medium-primary text-lg"
                >
                  {user.name}
                </span>
              </Link>
              <span>{user.title}</span>
            </section>
          </div>

          <div className="flex items-center justify-center">
            <Link
              href={`/profile/${user.id}`}
              className="bg-medium-primary text-darker-gray px-4 py-2 rounded-md hover:brightness-75"
            >
              PERFIL
            </Link>
          </div>
        </section>
      ))}
    </section>
  )
}
