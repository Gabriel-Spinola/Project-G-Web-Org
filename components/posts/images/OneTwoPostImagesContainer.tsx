'use client'

import Image from 'next/image'

export type PostImage = {
  source: string
  width: number
  height: number
  sizes: {
    size100: string
    sizePx: string
  }
  className?: string
}

interface Props {
  imagesSource: PostImage[]
  width: number
  height: number
}

export default function OneTwoPostImagesContainer({
  imagesSource,
  width,
  height,
}: Props) {
  return (
    <div
      className={`w-full h-full rounded-lg object-cover bg-medium-gray/75 hover:brightness-90 hover:cursor-pointer`}
    >
      {imagesSource.map((image: PostImage, index: number) => (
        <Image
          key={index}
          className="rounded-lg"
          src={image.source}
          alt={'Imagem Do Post'}
          width={image.width}
          height={image.height}
          sizes={
            imagesSource.length <= 1
              ? '(max-width: 100%)'
              : '(max-width: 384px)'
          }
          style={{ objectFit: 'contain' }}
          priority
        />
      ))}
    </div>
  )
}
