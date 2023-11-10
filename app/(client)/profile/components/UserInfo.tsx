'use client'

import FollowButton from '@/components/Buttons/FollowButton'
import styles from './profile.module.scss'
import { UserData } from '@/lib/types/common'
import { Icon } from '@chakra-ui/react'
import { BsFillPinMapFill, BsFillTelephoneFill } from 'react-icons/bs'
import { PiSunHorizonFill } from 'react-icons/pi'
import { RiGraduationCapFill } from 'react-icons/ri'
import EditUserInfo from './EditUserInfo'
interface Params {
  isOwner: boolean
  currentUserId?: string
  isFollowing: boolean
  user: Partial<UserData>
}

export default function UserInfo(params: Params) {
  return (
    <section
      id={styles.userInfo}
      className="flex flex-col w-full lg:w-[272px] x1:w-[400px] px-4 pb-4 mt-8 rounded-[12px] bg-pure-white text-darker-gray"
    >
      <div className="flex flex-row justify-evenly items-center m-4">
        <h1 className="text-center text-lg font-bold uppercase">Sobre mim</h1>
        <EditUserInfo isOwner={params.isOwner} user={params.user} />
      </div>

      <div className="flex flex-col h-full py-2 gap-2">
        <div className="flex flex-row w-full justify-around">
          <span>
            Seguidores:{' '}
            <span className="font-bold">
              {params.user._count?.followers ?? 0}
            </span>
          </span>
          <span>
            Seguindo:{' '}
            <span className="font-bold">
              {params.user._count?.following ?? 0}
            </span>
          </span>
        </div>

        <hr />
        <p id="description">{params.user.description}</p>

        {!params.isOwner && (
          <FollowButton
            authorId={params.currentUserId}
            isFollowing={params.isFollowing}
            targetId={params.user.id as string}
          />
        )}

        <span>
          <Icon as={RiGraduationCapFill} w={6} h={6} /> Graduação:{' '}
          {params.user.graduations?.map((graduation, index) => (
            <span key={index} className="font-bold">
              {graduation}
            </span>
          ))}
        </span>

        <span>
          <Icon as={PiSunHorizonFill} w={6} h={6} /> De:{' '}
          <span className="font-bold">{params.user.location}</span>
        </span>

        <span>
          <Icon as={BsFillPinMapFill} w={6} h={6} /> Em:{' '}
          <span className="font-bold">{params.user.location}</span>
        </span>

        <span>
          <Icon as={BsFillTelephoneFill} w={6} h={6} /> Telefone:{' '}
          <span className="font-bold">
            {params.user.contactPhone?.toString() ?? ''}
          </span>
        </span>
      </div>
    </section>
  )
}
