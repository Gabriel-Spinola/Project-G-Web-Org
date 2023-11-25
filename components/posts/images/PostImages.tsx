'use client'

import { getPostImageUrl } from '@/lib/storage/supabase'
import { Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaArrowAltCircleRight, FaArrowCircleLeft } from 'react-icons/fa'

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
    // NOTE - Image and controllers Wrapper
    <section className="lg:h-[768px] w-full">
      <div className="absolute flex w-[768px] h-[768px] items-center">
        {currentImageIndex + 1 > 1 && (
          <button
            className="absolute flex items-center justify-center left-0 h-[768px] w-16 p-2 hover:bg-medium-gray/25"
            onClick={handleImageChangeSubtract}
          >
            <FaArrowCircleLeft size={32} />
          </button>
        )}
        {/* NOTE - Current Image */}
        {currentImageIndex + 1 < imagesSrc.length && (
          <button
            className="absolute flex items-center justify-center right-0 h-[768px] w-16 p-2 hover:bg-medium-gray/25"
            onClick={handleImageChangeAdd}
          >
            <FaArrowAltCircleRight size={32} />
          </button>
        )}
      </div>
      {/* NOTE - Image Wrapper */}
      <div className="overflow-hidden flex items-center justify-center bg-darker-gray rounded-lg w-full h-full">
        {currentImage && (
          <Image
            alt=""
            src={getPostImageUrl(currentImage)}
            className="overflow-hidden max-h-[768px]"
          />
        )}
      </div>

      {/* NOTE - Image controllers dots */}
      <section
        id="controllers"
        className="flex w-full items-center justify-center max-h-[768px] max-w-[768px] p-4"
      >
        <div id="selectors" className="flex flex-row gap-8">
          {imagesSrc.map((_, index) => (
            <>
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index)
                }}
              >
                <div
                  className={`rounded-full ${
                    currentImageIndex === index
                      ? ' bg-medium-primary'
                      : 'bg-medium-gray'
                  } p-2 h-2`}
                >
                  {' '}
                </div>
              </button>
            </>
          ))}
        </div>
      </section>
    </section>
  )
}
