'use client'

import { Image } from '@chakra-ui/react'
import React from 'react'

export function ProfileSkeleton() {
  return (
    <main className="bg-darker-white">
      <div className="w-full h-[calc(100vh-88px)] bg-light-secundary">
        <div className="w-96 h-96">
          <Image
            src="https://ovo.blog.br/wp-content/uploads/2019/08/Ovo-de-pombo-%C3%A9-comest%C3%ADvel-2.jpg"
            alt="pinto"
          />
        </div>
      </div>
    </main>
  )
}
