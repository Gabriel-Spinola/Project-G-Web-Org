'use client'

import SendImageButton from '@/components/Buttons/SendImageButton'
import { validateImageInput } from '@/lib/schemas/post.schema'
import { Avatar } from '@chakra-ui/avatar'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import { changeProfilePic } from '../_actions'

type Props = {
  profileId: string
  profilePicUrl: string
}

export default function EditableAvatar({ profileId, profilePicUrl }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [image, setImages] = useState<File | undefined>(undefined)

  async function handleFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const { error } = await changeProfilePic(profileId, formData)

    if (error) {
      alert('Falha ao atualizar imagem')
      setImages(undefined)

      return
    }

    setImages(undefined)
    onClose()
  }

  async function onImageChanges(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    if (!event.target.files || event.target.files.length <= 0) {
      return
    }

    const { error } = validateImageInput(event.target.files[0], 1)

    if (error) {
      alert(error)

      return
    }

    const newImage = event.target.files[0]
    setImages(newImage)
  }

  return (
    <div>
      <Avatar
        size={'2xl'}
        src={profilePicUrl}
        onClick={onOpen}
        className="hover:brightness-75 hover:cursor-pointer"
      ></Avatar>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />

          <ModalBody>
            <form method="PUT" onSubmit={handleFormSubmission}>
              <SendImageButton onChange={onImageChanges} />

              <Button type="submit">Send image</Button>
            </form>

            <div id="image-preview-container">
              {image && (
                <Image
                  src={URL.createObjectURL(image)}
                  width={300}
                  height={400}
                  alt="profile-pic"
                />
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
