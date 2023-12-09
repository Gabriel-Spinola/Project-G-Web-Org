'use client'

import styles from './profile.module.scss'
import { UserData } from '@/lib/types/common'
import { Icon } from '@chakra-ui/react'
import { BsFillPinMapFill, BsFillTelephoneFill } from 'react-icons/bs'
import { PiSunHorizonFill } from 'react-icons/pi'
import Graduations from './Graduations'
import { IoMailUnread } from 'react-icons/io5'
import { TbWorldCode } from 'react-icons/tb'
import { FaLinkedin } from 'react-icons/fa'
import dynamic from 'next/dynamic'

const DynamicEditUser = dynamic(() => import('./EditUserInfo'), { ssr: false })

const DynamicFollowersModal = dynamic(() => import('./modals/FollowersModal'), {
  ssr: false,
  loading: () => (
    <span className="text-center">
      <span className="font-bold">...</span> Seguidores
    </span>
  ),
})

const DynamicFollowingModal = dynamic(() => import('./modals/FollowingModal'), {
  ssr: false,
  loading: () => (
    <span className="text-center">
      Seguindo <span className="font-bold">...</span>
    </span>
  ),
})

interface Props {
  isOwner: boolean
  user: Partial<UserData>
}

export default function UserInfo({ isOwner, user }: Props) {
  function formatLinkedinProfile(url: string): string {
    return url.substring(url.indexOf('in/') + 3, url.length - 1)
  }

  return (
    <section className="flex flex-col w-full">
      {/* NOTE - Follows container */}
      <div
        className={`${styles.cardShadow} flex flex-row w-full justify-around lg:w-[272px] x1:w-[400px] px-4 py-4 mt-8 rounded-[12px] bg-pure-white text-darker-gray`}
      >
        <DynamicFollowersModal
          followers={user.followers}
          followersSpan={
            <span className="text-center">
              <span className="font-bold">{user.followers?.length ?? 0}</span>{' '}
              Seguidores
            </span>
          }
        />

        <span className="font-bold  text-xl">|</span>

        <DynamicFollowingModal
          following={user.following}
          followingSpan={
            <span className="text-center">
              Seguindo{' '}
              <span className="font-bold">{user.following?.length ?? 0}</span>
            </span>
          }
        />
      </div>

      <div
        className={`${styles.cardShadow} flex flex-col w-full lg:w-[272px] x1:w-[400px] px-4 pb-4 mt-8 rounded-[12px] bg-pure-white text-darker-gray`}
      >
        <div className="flex flex-row justify-evenly items-center m-4">
          <h1 className="text-center text-lg font-bold uppercase">Sobre mim</h1>

          <DynamicEditUser user={user} isOwner={isOwner} />
        </div>

        <div className="flex flex-col h-full py-2 gap-2">
          <p id="description">{user.description}</p>

          <hr />

          <span className="py-2">
            <Icon as={BsFillPinMapFill} w={6} h={6} />{' '}
            <span className="font-semibold">Área: </span>
            <span>{user.title}</span>
          </span>

          <span className="py-2">
            <Icon as={PiSunHorizonFill} w={6} h={6} />{' '}
            <span className="font-semibold">De: </span>
            <span>{user.location}</span>
          </span>
        </div>
      </div>

      <div
        id="contact-info-container"
        className={`${styles.cardShadow} flex flex-col w-full lg:w-[272px] x1:w-[400px] px-4 py-4 mt-8 rounded-[12px] bg-pure-white text-darker-gray gap-2`}
      >
        <span className="py-2">
          <Icon as={FaLinkedin} w={6} h={6} />{' '}
          <span className="font-semibold">Linkedin: </span>
          <span className="text-medium-primary hover:underline">
            {user.linkedinUrl ? (
              <a href={`${user.linkedinUrl.toString()}`}>
                {/* displays only the lindekin username */}
                {formatLinkedinProfile(user.linkedinUrl.toString())}
              </a>
            ) : (
              ''
            )}
          </span>
        </span>

        <span className="py-2">
          <Icon as={TbWorldCode} w={6} h={6} />{' '}
          <span className="font-semibold">Site: </span>
          <span className="text-medium-primary hover:underline">
            {user.siteUrl ? <a href={`${user.siteUrl}`}>{user.siteUrl}</a> : ''}
          </span>
        </span>

        <span className="py-2">
          <Icon as={IoMailUnread} w={6} h={6} />{' '}
          <span className="font-semibold">Email: </span>
          <span className="text-medium-primary hover:underline">
            {' '}
            {user.email ? (
              <a href={`mailto:${user.email}`}>{user.email}</a>
            ) : (
              ''
            )}
          </span>
        </span>

        <span className="py-2">
          <Icon as={BsFillTelephoneFill} w={6} h={6} />{' '}
          <span className="font-semibold">Telefone: </span>
          <span>{user.contactPhone?.toString() ?? ''}</span>
        </span>
      </div>

      <div
        id="contact-info-container"
        className={`${styles.cardShadow} flex flex-col w-full lg:w-[272px] x1:w-[400px] px-4 py-4 mt-8 rounded-[12px] bg-pure-white text-darker-gray gap-2 items-center`}
      >
        <Graduations
          graduation={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Harvard_University_logo.svg/800px-Harvard_University_logo.svg.png'
          }
        />
      </div>
    </section>
  )
}
