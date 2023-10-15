'use client'

import Image from 'next/image'

interface Props {
  imgSrc: string
  width: number
  height: number
}

export default function OneImageDisplay({ imgSrc, width, height }: Props) {
  return (
    <div
      className={`w-full rounded-lg object-cover bg-medium-gray/75 hover:brightness-90 hover:cursor-pointer`}
    >
      <Image
        className="rounded-lg object-cover"
        src={imgSrc}
        alt={'Imagem Do Post'}
        width={width}
        height={height}
        sizes="(max-width: 100%)"
        priority
      />
    </div>
  )
}
