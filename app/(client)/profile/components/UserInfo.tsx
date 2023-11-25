'use client'

import styles from './profile.module.scss'
import { UserData } from '@/lib/types/common'
import { Icon } from '@chakra-ui/react'
import { BsFillPinMapFill, BsFillTelephoneFill } from 'react-icons/bs'
import { PiSunHorizonFill } from 'react-icons/pi'
import { RiGraduationCapFill } from 'react-icons/ri'
import EditUserInfo from './EditUserInfo'
import Graduations from './Graduations'

interface Params {
  isOwner: boolean

  user: Partial<UserData>
}

export default function UserInfo({ isOwner, user }: Params) {
  return (
    <section className="flex flex-col w-full">
      {/* NOTE - Follows container */}
      <div
        className={`${styles.cardShadow} flex flex-row w-full justify-around lg:w-[272px] x1:w-[400px] px-4 py-4 mt-8 rounded-[12px] bg-pure-white text-darker-gray`}
      >
        <span className="text-center">
          <span className="font-bold">{user._count?.followers ?? 0}</span>{' '}
          Seguidores
        </span>

        <span className="font-bold  text-xl">|</span>

        <span className="text-center">
          Seguindo{' '}
          <span className="font-bold">{user._count?.following ?? 0}</span>
        </span>
      </div>

      <div
        className={`${styles.cardShadow} flex flex-col w-full lg:w-[272px] x1:w-[400px] px-4 pb-4 mt-8 rounded-[12px] bg-pure-white text-darker-gray`}
      >
        <div className="flex flex-row justify-evenly items-center m-4">
          <h1 className="text-center text-lg font-bold uppercase">Sobre mim</h1>
          <EditUserInfo isOwner={isOwner} user={user} />
        </div>

        <div className="flex flex-col h-full py-2 gap-2">
          <hr />
          <p id="description">{user.description}</p>

          <span className="py-2">
            <Icon as={RiGraduationCapFill} w={6} h={6} /> Graduação:{' '}
            {user.graduations?.map((graduation, index) => (
              <span key={index} className="font-bold">
                {graduation}
              </span>
            ))}
          </span>

          <span className="py-2">
            <Icon as={PiSunHorizonFill} w={6} h={6} /> De:{' '}
            <span className="font-bold">{user.location}</span>
          </span>

          <span className="py-2">
            <Icon as={BsFillPinMapFill} w={6} h={6} /> Em:{' '}
            <span className="font-bold">{user.location}</span>
          </span>
        </div>
      </div>

      <div
        id="contact-info-container"
        className={`${styles.cardShadow} flex flex-col w-full lg:w-[272px] x1:w-[400px] px-4 py-4 mt-8 rounded-[12px] bg-pure-white text-darker-gray gap-2`}
      >
        <span className="py-2">
          <Icon as={BsFillTelephoneFill} w={6} h={6} /> Site:{' '}
          <span className="font-bold">{user.siteUrl?.toString() ?? ''}</span>
        </span>

        <span className="py-2">
          <Icon as={BsFillTelephoneFill} w={6} h={6} /> Email:{' '}
          <span className="font-bold">{user.email?.toString() ?? ''}</span>
        </span>

        <span className="py-2">
          <Icon as={BsFillTelephoneFill} w={6} h={6} /> Telefone:{' '}
          <span className="font-bold">
            {user.contactPhone?.toString() ?? ''}
          </span>
        </span>
      </div>

      <div
        id="contact-info-container"
        className={`${styles.cardShadow} flex flex-col w-full lg:w-[272px] x1:w-[400px] px-4 py-4 mt-8 rounded-[12px] bg-pure-white text-darker-gray gap-2 items-center`}
      >
        <Graduations
          Graduation={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Harvard_University_logo.svg/800px-Harvard_University_logo.svg.png'
          }
        />
      </div>
    </section>
  )
}
