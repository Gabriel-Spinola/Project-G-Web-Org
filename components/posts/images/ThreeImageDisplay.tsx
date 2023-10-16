'use client'

import Image from 'next/image'

interface Props {
  imgSrc: string
  secondImgSrc: string
  thirdImgSrc: string
  width: number
  height: number
  heightOne: number
}

export default function ThreeImageDisplay({
  imgSrc,
  secondImgSrc,
  thirdImgSrc,
  width,
  height,
  heightOne,
}: Props) {
  return (
    <section className="w-full h-full rounded-lg overflow-hidden max-h-[480px] bg-medium-gray/75 flex hover:brightness-90 hover:cursor-pointer">
      <Image
        src={imgSrc}
        alt={'Imagem Do Post'}
        width={width}
        height={heightOne}
        objectFit="cover"
        sizes="(max-width: 100%)"
        style={{ objectFit: 'contain' }}
        priority
      />
      <div className="flex flex-col">
        <Image
          src={secondImgSrc}
          alt={'Imagem Do Post'}
          width={width}
          height={height}
          objectFit="cover"
          sizes="(max-width: 100%)"
          style={{ objectFit: 'contain' }}
          priority
        />
        <Image
          src={thirdImgSrc}
          alt={'Imagem Do Post'}
          width={width}
          height={height}
          objectFit="cover"
          sizes="(max-width: 100%)"
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </section>
  )
}
