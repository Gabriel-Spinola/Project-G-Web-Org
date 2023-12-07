'use client'

import Avatar from '@/components/Avatar'
import { useDisclosure } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'

const DynamicEditableAvatarModal = dynamic(
  () => import('./EditableAvatarModal'),
  { ssr: false },
)

type Props = {
  profileId: string
  profilePicUrl: string
}

export default function EditableAvatar({ profileId, profilePicUrl }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [image, setImages] = useState<File | undefined>(undefined)

  const [shouldDisplayPreviewImage, setShouldDisplayPreviewImage] =
    useState(false)

  return (
    <div>
      <div
        onClick={onOpen}
        className="relative flex justify-end items-end hover:brightness-75 hover:cursor-pointer"
      >
        {shouldDisplayPreviewImage ? (
          <Avatar
            size="xl"
            imageUrl={URL.createObjectURL(image as File)}
          ></Avatar>
        ) : (
          <Avatar size="xl" imageUrl={profilePicUrl}></Avatar>
        )}

        <div className="absolute bg-darker-white p-2 rounded-full">
          <AiFillCamera color={'#242424'} />
        </div>
      </div>

      <DynamicEditableAvatarModal
        isOpen={isOpen}
        onClose={onClose}
        setImages={setImages}
        setShouldDisplayPreviewImage={setShouldDisplayPreviewImage}
        profileId={profileId}
        image={image}
      />
    </div>
  )
}
