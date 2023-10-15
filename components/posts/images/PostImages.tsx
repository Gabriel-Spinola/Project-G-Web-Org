import Image from 'next/image'
import React from 'react'

type Props = {
  source: string
  width: number
  height: number
  sizes: string
  style: { [k in string]: string }
}

export default function PostImages({
  source,
  width,
  height,
  sizes,
  style,
}: Props) {
  return (
    <Image
      className="rounded-lg"
      src={source}
      alt={'Imagem Do Post'}
      width={width}
      height={height}
      sizes={sizes}
      style={style}
      priority
    />
  )
}
