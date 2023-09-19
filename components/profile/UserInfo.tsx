'use client'

import { Icon } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon, BellIcon } from '@chakra-ui/icons'
import { User } from '@prisma/client'

interface Params {
  userPrisma: Partial<User>
  followers: number
  location: string
  graduation: string
  from: string
  work: string
  phone: string
}

export default function UserInfo(params: Params) {
  return (
    <section className="">
      <h1>Sobre mim</h1>
      <span>
        <BellIcon /> Seguidores: {params.followers}
      </span>
      <span>
        <BellIcon /> Graduação: {params.graduation}
      </span>
    </section>
  );
}
