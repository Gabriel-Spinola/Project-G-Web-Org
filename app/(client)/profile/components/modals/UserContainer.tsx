import Avatar from '@/components/Avatar'
import { UserData } from '@/lib/types/common'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import Link from 'next/link'
import React from 'react'

type Props = {
  user: Partial<UserData>
}

export default function UserContainer({ user }: Props) {
  return (
    <div
      key={user.id}
      className="w-full flex justify-between md:w-[80%] lg:w-[65%] x1:w-[90%] px-2 py-4 border-light-gray/50 rounded-md border-[1px]"
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

        <section className="flex flex-col justify-between align-middle mt-2">
          <Link href={`/profile/${user.id}`} className=" decoration-">
            <span key={user.id} className="hover:text-medium-primary text-lg">
              {user.name}
            </span>
          </Link>
          <span>{user.title}</span>
        </section>
      </div>

      <div className="flex items-center justify-center">
        <Link
          href={`/profile/${user.id}`}
          className="bg-medium-primary px-4 py-2 rounded-md"
        >
          <span className="text-pure-white">PERFIL</span>
        </Link>
      </div>
    </div>
  )
}
