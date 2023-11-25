'use client'

import SendImageButton from '@/components/Buttons/SendImageButton'
import { validateImageInput } from '@/lib/schemas/imageValidation.schema'
import { Avatar } from '@chakra-ui/avatar'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import { changeProfilePic } from '../_actions'
import { AiFillCamera } from 'react-icons/ai'
import { toast } from 'react-toastify'

type Props = {
  profileId: string
  profilePicUrl: string
}

export default function EditableAvatar({ profileId, profilePicUrl }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [image, setImages] = useState<File | undefined>(undefined)

  const [shouldDisplayPreviewImage, setShouldDisplayPreviewImage] =
    useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    setIsLoading(true)

    const { error } = await toast.promise(
      changeProfilePic(profileId, formData),
      { pending: 'Enviando nova imagem...' },
    )

    setIsLoading(false)

    if (error) {
      toast.error('Falha ao atualizar imagem 😔')
      setImages(undefined)

      return
    }

    toast.success('Imagem atualizada com sucesso! 👌')
    setShouldDisplayPreviewImage(true)
    onClose()
  }

  async function onImageChanges(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    if (!event.target.files || event.target.files.length <= 0) {
      return
    }

    const { error } = validateImageInput(event.target.files[0], 1)

    if (error) {
      toast.warn(error)

      return
    }

    const newImage = event.target.files[0]
    setImages(newImage)
  }

  return (
    <div>
      <div
        onClick={onOpen}
        className="flex justify-end items-end hover:brightness-75 hover:cursor-pointer"
      >
        {shouldDisplayPreviewImage ? (
          <Avatar
            size={'2xl'}
            src={URL.createObjectURL(image as File)}
          ></Avatar>
        ) : (
          <Avatar size={'2xl'} src={profilePicUrl}></Avatar>
        )}
        <div className="absolute bg-darker-white p-2 rounded-full">
          <AiFillCamera color={'#242424'} />
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            <form method="PUT" onSubmit={handleFormSubmission}>
              <SendImageButton onChange={onImageChanges} />

              <Button
                type="submit"
                disabled={isLoading}
                aria-disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar Imagem'}
              </Button>
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
