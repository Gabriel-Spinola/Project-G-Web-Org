'use client'

import Image from 'next/image'

interface Props {
  imgSrc: string
  secondImgSrc: string
  width: number
  height: number
}

export default function TwoImageDisplay({
  imgSrc,
  secondImgSrc,
  width,
  height,
}: Props) {
  return (
    <div className="w-full h-full rounded-lg bg-black flex">
      <Image
        className="rounded-lg"
        src={imgSrc}
        alt={'Imagem Do Post'}
        width={width}
        height={height}
        objectFit="cover"
        sizes="(max-width: 100%)"
        style={{ objectFit: 'contain' }}
        priority
      />
      <Image
        className="rounded-lg"
        src={secondImgSrc}
        alt={'Imagem Do Post'}
        width={width}
        height={height}
        objectFit="cover"
        sizes="(max-width: 100%)"
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  )
}
