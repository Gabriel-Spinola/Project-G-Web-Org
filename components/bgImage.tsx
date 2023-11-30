'use client'

import { Image } from '@chakra-ui/react'

interface Params {
  url: string
  alt: string
}

export const BgImage = (params: Params) => {
  return (
    <section>
      <Image
        className="absolute w-full h-[calc(100vh-88px)] object-cover"
        src={params.url}
        alt={params.alt}
      />
      <div className="absolute w-full h-[calc(100vh-88px)] bg-black/75" />
    </section>
  )
}
