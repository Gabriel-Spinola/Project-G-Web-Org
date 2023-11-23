'use client'

import { getPostImageUrl } from '@/lib/storage/supabase'
import { Image } from '@chakra-ui/react'
import React, { useState } from 'react'

type ImagesData = {
  ImagesSrc: string[]
}

export default function PostImagesCarousel({ ImagesSrc }: ImagesData) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const currentImage = ImagesSrc[currentImageIndex]

  function handleImageChangeAdd() {
    setCurrentImageIndex((current) => current + 1)
  }

  function handleImageChangeSubtract() {
    setCurrentImageIndex((current) => current - 1)
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg">
        <Image alt="" src={getPostImageUrl(currentImage)} className="w-full" />
      </div>

      {/* {currentImageIndex === } */}

      {currentImageIndex + 1 !== ImagesSrc.length && (
        <button onClick={handleImageChangeAdd}>PRox</button>
      )}

      {currentImageIndex + 1 > 0 && (
        <button onClick={handleImageChangeSubtract}>Voltar</button>
      )}
    </div>
  )
}
