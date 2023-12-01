'use client'

import { getImageAbsoluteURLFromPubBucket } from '@/lib/storage/supabase'
import { Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaArrowAltCircleRight, FaArrowCircleLeft } from 'react-icons/fa'

type ImagesData = {
  imagesSrc: string[]
  projectOwner?: string | null
}

export default function ProjectImagesCarousel({
  imagesSrc,
  projectOwner,
}: ImagesData) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const currentImage = imagesSrc.at(currentImageIndex)

  function handleImageChangeAdd() {
    setCurrentImageIndex((current) => current + 1)
  }

  function handleImageChangeSubtract() {
    setCurrentImageIndex((current) => current - 1)
  }

  return (
    <>
      <aside className="relative flex flex-col w-full justify-end">
        {/* NOTE - Image and controllers Wrapper */}
        <section className="relative h-full w-full">
          <div className="absolute flex w-full h-full items-center">
            {currentImageIndex + 1 > 1 && (
              <button
                className="absolute flex items-center justify-center left-0 h-full w-16 p-2 text-darker-primary hover:bg-medium-gray/25"
                onClick={handleImageChangeSubtract}
              >
                <div className="shadow-lg">
                  <FaArrowCircleLeft size={32} />
                </div>
              </button>
            )}
            {/* NOTE - Current Image */}
            {currentImageIndex + 1 < imagesSrc.length && (
              <button
                className="absolute flex items-center justify-center right-0 h-full w-16 p-2 text-darker-primary hover:bg-medium-gray/25"
                onClick={handleImageChangeAdd}
              >
                <FaArrowAltCircleRight size={32} />
              </button>
            )}
          </div>
          {/* NOTE - Image Wrapper */}
          <div className="overflow-hidden flex items-center justify-center bg-darker-gray rounded-l-lg w-full h-full">
            {currentImage && (
              <Image
                alt=""
                src={getImageAbsoluteURLFromPubBucket(
                  `projects/${projectOwner}/images/${currentImage}`,
                )}
                className="overflow-hidden object-contain w-full max-h-full"
              />
            )}
          </div>
        </section>
        {/* NOTE - Image controllers dots */}
        {imagesSrc.length > 1 ? (
          <section
            id="controllers"
            className="absolute flex w-full items-center justify-center max-h-full max-w-full p-2"
          >
            <div id="selectors" className="flex flex-row gap-8">
              {imagesSrc.map((_, index) => (
                <div key={index}>
                  <button
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
                </div>
              ))}
            </div>
          </section>
        ) : (
          ''
        )}
      </aside>
    </>
  )
}
