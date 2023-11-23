'use client'

import { getPostImageUrl } from '@/lib/storage/supabase'
import { Image } from '@chakra-ui/react'
import React, { useState } from 'react'

type ImagesData = {
  imagesSrc: string[]
}

export default function PostImagesCarousel({ imagesSrc }: ImagesData) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const currentImage = imagesSrc.at(currentImageIndex)

  function handleImageChangeAdd() {
    setCurrentImageIndex((current) => current + 1)
  }

  function handleImageChangeSubtract() {
    setCurrentImageIndex((current) => current - 1)
  }

  return (
    <div>
      <div className="overflow-hidden rounded-lg">
        {currentImage && (
          <Image
            alt=""
            src={getPostImageUrl(currentImage)}
            className="w-full"
          />
        )}
      </div>

      <div id="controllers">
        {currentImageIndex >= 0 && (
          <button className="text-4xl" onClick={handleImageChangeSubtract}>
            &lt;
          </button>
        )}

        {currentImageIndex + 1 <= imagesSrc.length && (
          <button className="text-4xl" onClick={handleImageChangeAdd}>
            &gt;
          </button>
        )}

        <div id="selectors">
          {imagesSrc.map((_, index) => (
            <div
              key={index}
              className={`rounded-full ${
                currentImageIndex === index
                  ? ' bg-medium-primary'
                  : 'bg-medium-gray'
              } p-1 h-2`}
            >
              <button
                onClick={() => {
                  setCurrentImageIndex(index)
                }}
              >
                {index}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
