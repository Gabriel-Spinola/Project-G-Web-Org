'use client'

import Image from 'next/image'
import styles from './DisplayImages.module.scss'

interface Props {
  imgSrc: string
  secondImgSrc: string
  thirdImgSrc: string
  width: number
  height: number
}

export default function ThreeImageDisplay({
  imgSrc,
  secondImgSrc,
  thirdImgSrc,
  width,
  height,
}: Props) {
  return (
    <div className="w-full h-full grid grid-cols-5 grid-rows-4 rounded-lg bg-black">
      <Image
        className={`rounded-lg` + styles.img1}
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
        className={`rounded-lg` + styles.img2}
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
        className={`rounded-lg` + styles.img3}
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
  )
}
