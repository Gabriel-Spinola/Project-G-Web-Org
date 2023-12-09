/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

// TODO - Framgent this into smaller parts (specially not owner specific stuff), and implement dynamic

import React from 'react'
import { UserData } from '@/lib/types/common'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const DynamicProfileAvatar = dynamic(
  () => import('./profileCard/ProfileAvatar'),
  { ssr: false, loading: () => <>Carregndo Avatar</> },
)

const DynamicProfileCardButtons = dynamic(
  () => import('./profileCard/ProfileCardButtons'),
  {
    ssr: false,
    loading: () => <>Carregndo Botões</>,
  },
)

interface Props {
  isOwner: boolean
  isFollowing: boolean
  user: Partial<UserData>
  currentUserId?: string
}

export default function ProfileCard({
  isOwner,
  isFollowing,
  currentUserId,
  user,
}: Props) {
  return (
    <section
      id="Wrapper"
      className="relative flex h-[208px] min-w-full max-w-full items-center gap-[32px] py-0 px-[64px]"
    >
      {/* NOTE - Card BG */}
      <Image
        src={'/assets/bgimagedasdsa.jpg'}
        alt="profileBg"
        fill
        objectFit="cover"
        className="brightness-[25%]"
      />

      {/* NOTE - Profile pic */}
      <div id="profile-avatar-wrapper">
        <DynamicProfileAvatar isOwner={isOwner} user={user} />
      </div>

      {/* NOTE - Card info */}
      <div
        id="profile-info-wrapper"
        className="flex flex-row items-center w-[100%] h-[161px] gap-[75%] text-darker-white z-[1]"
      >
        <div id="info-name-wrapper" className="flex flex-col">
          <h1 className="text-[52px] text-pure-white font-bold">
            {user.name ?? ''}
          </h1>

          <div className="flex flex-row gap-2">
            <DynamicProfileCardButtons
              isOwner={isOwner}
              currentUserId={currentUserId}
              isFollowing={isFollowing}
              userId={user.id as string}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
