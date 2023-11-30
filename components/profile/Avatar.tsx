'use client'

import { Avatar } from '@chakra-ui/react'

interface Props {
  size: string
  src: string | undefined
}

export default function UserPhoto({ size, src }: Props) {
  return <Avatar size={size} src={src} />
}
