import React from 'react'
import '@/app/styles/avatar.css'
import Image from 'next/image'

const sizes = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl',
} as const

interface Props {
  // size: string
  size: keyof typeof sizes
  imageUrl?: string
}

export default function Avatar({ size, imageUrl }: Props) {
  if (!imageUrl) {
    imageUrl = '/assets/avatar-icon.png'
  }
  return (
    <div className={`${size} relative overflow-hidden`}>
      <Image
        src={imageUrl}
        objectFit="cover"
        alt="Profile Pic"
        fill
        quality={75}
      />
    </div>
  )
}
