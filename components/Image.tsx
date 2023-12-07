'use client'

import { Image } from '@chakra-ui/react'

interface Params {
  url: string
  alt: string
  className?: string
}

export const StaticImage = (params: Params) => {
  return (
    <Image
      className={params.className}
      src={params.url}
      alt={params.alt}
      loading="lazy"
    />
  )
}
