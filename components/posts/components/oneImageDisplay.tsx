'use client'

import Image from 'next/image'

interface Props {
  imgSrc: string
  width: number
  height: number
}

export default function OneImageDisplay({ imgSrc, width, height }: Props) {
  return (
    <div className={`w-full h-full rounded-lg object-cover bg-black`}>
      <Image
        className="rounded-lg"
        src={imgSrc}
        alt={'Imagem Do Post'}
        width={width}
        height={height}
        sizes="(max-width: 100%)"
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  )
}
