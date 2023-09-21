'use client'
import React from 'react'
import { Icon } from '@chakra-ui/react'
import { BellIcon } from '@chakra-ui/icons'
import { User } from '@prisma/client'
import { RiGraduationCapFill } from 'react-icons/ri'
import { PiSunHorizonFill } from 'react-icons/pi'
import { BsFillPinMapFill, BsFillTelephoneFill } from 'react-icons/bs'
import { MdWork } from 'react-icons/md'
import './profile.scss'

interface Params {
  userPrisma: Partial<User>
  followers: number
  location: string
  graduation: string
  from: string
  work: string
  phone: string
  description: string
}

export default function UserInfo(params: Params) {
  return (
    <section
      id="userInfo"
      className="mt-8 w-80% lg:w-[312px] rounded-[12px] p-4 bg-pure-white text-darker-gray"
    >
      <h1 className="text-center text-lg font-bold uppercase">Sobre mim</h1>
      <p id="description">{params.description}</p>
      <hr />
      <div className="flex flex-col py-2 gap-2">
        <span>
          <BellIcon w={6} h={6} /> Seguidores:{' '}
          <span className="font-bold">{params.followers}</span>
        </span>
        <span>
          <Icon as={RiGraduationCapFill} w={6} h={6} /> Graduação:{' '}
          <span className="font-bold">{params.graduation}</span>
        </span>
        <span>
          <Icon as={PiSunHorizonFill} w={6} h={6} /> De:{' '}
          <span className="font-bold">{params.from}</span>
        </span>
        <span>
          <Icon as={BsFillPinMapFill} w={6} h={6} /> Em:{' '}
          <span className="font-bold">{params.location}</span>
        </span>
        <span>
          <Icon as={MdWork} w={6} h={6} /> Trabalho:{' '}
          <span className="font-bold">{params.work}</span>
        </span>
        <span>
          <Icon as={BsFillTelephoneFill} w={6} h={6} /> Telefone:{' '}
          <span className="font-bold">{params.phone}</span>
        </span>
      </div>
    </section>
  )
}
