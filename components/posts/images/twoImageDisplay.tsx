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
    <section className="w-full h-full rounded-lg overflow-hidden max-h-[480px] bg-medium-gray/75 flex hover:brightness-90 hover:cursor-pointer">
      <div className="flex justify-center">
        <Image
          src={imgSrc}
          alt={'Imagem Do Post'}
          width={width}
          height={height}
          sizes="(max-width: 384px)"
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      <div className="flex justify-center">
        <Image
          className="rounded-lg"
          src={secondImgSrc}
          alt={'Imagem Do Post'}
          width={width}
          height={height}
          sizes="(max-width: 384px)"
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </section>
  )
}
