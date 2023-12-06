'use client'

import Graduations from '@/app/(client)/profile/components/Graduations'
import { Icon } from '@chakra-ui/react'
import React from 'react'
import { BsFillPinMapFill, BsFillTelephoneFill } from 'react-icons/bs'
import { FaLinkedin } from 'react-icons/fa'
import { IoMailUnread } from 'react-icons/io5'
import { PiSunHorizonFill } from 'react-icons/pi'
import { TbWorldCode } from 'react-icons/tb'

type Props = {
  params: {
    description: string | undefined | null
    title: string | undefined | null
    location: string | undefined | null
    linkedin: string | undefined | null
    site: string | undefined | null
    email: string | undefined | null
    collegeImg: string
  }
}

export default function UserInfoPreview({ params }: Props) {
  return (
    <section className="flex flex-col">
      <div
        className={`flex flex-col w-full lg:w-[272px] x1:w-[400px] px-4 rounded-[12px] bg-pure-white text-darker-gray`}
      >
        <div className="flex flex-row justify-evenly items-center m-4">
          <h1 className="text-center text-lg font-bold uppercase">Sobre mim</h1>
        </div>

        <div className="flex flex-col h-full py-2 gap-2">
          <p id="description">{params.description}</p>

          <hr />

          <span className="py-2">
            <Icon as={BsFillPinMapFill} w={6} h={6} />{' '}
            <span className="font-semibold">Área: </span>
            <span>{params.title}</span>
          </span>

          <span className="py-2">
            <Icon as={PiSunHorizonFill} w={6} h={6} />{' '}
            <span className="font-semibold">De: </span>
            <span>{params.location}</span>
          </span>
        </div>
      </div>

      <div
        id="contact-info-container"
        className={`flex flex-col w-full lg:w-[272px] x1:w-[400px] px-4 py-4 mt-8 rounded-[12px] bg-pure-white text-darker-gray gap-2`}
      >
        <span className="py-2">
          <Icon as={FaLinkedin} w={6} h={6} />{' '}
          <span className="font-semibold">Linkedin: </span>
          <span className="text-medium-primary hover:underline">
            {params.linkedin}
          </span>
        </span>

        <span className="py-2">
          <Icon as={TbWorldCode} w={6} h={6} />{' '}
          <span className="font-semibold">Site: </span>
          <span className="text-medium-primary hover:underline">
            {params.site}
          </span>
        </span>

        <span className="py-2">
          <Icon as={IoMailUnread} w={6} h={6} />{' '}
          <span className="font-semibold">Email: </span>
          <span className="text-medium-primary hover:underline">
            {params.email}
          </span>
        </span>

        <span className="py-2">
          <Icon as={BsFillTelephoneFill} w={6} h={6} />{' '}
          <span className="font-semibold">Telefone: </span>
          <span>{params.email}</span>
        </span>
      </div>

      <div
        id="contact-info-container"
        className={`flex flex-col w-full lg:w-[272px] x1:w-[400px] px-4 py-4 mt-8 rounded-[12px] bg-pure-white text-darker-gray gap-2 items-center`}
      >
        <Graduations graduation={params.collegeImg} />
      </div>
    </section>
  )
}
