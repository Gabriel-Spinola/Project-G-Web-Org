'use client'

import SendImageButton from '@/components/Buttons/SendImageButton'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from '@chakra-ui/react'
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react'
import { changeProfilePic } from '../_actions'
import Image from 'next/image'
import { validateImageInput } from '@/lib/schemas/imageValidation.schema'

type Props = {
  isOpen: boolean
  onClose: () => void
  setImages: Dispatch<SetStateAction<File | undefined>>
  setShouldDisplayPreviewImage: Dispatch<SetStateAction<boolean>>
  profileId: string
  image?: File
}

export default function EditableAvatarModal({
  isOpen,
  onClose,
  setImages,
  setShouldDisplayPreviewImage,
  profileId,
  image,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleFormSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const toast = (await import('react-toastify')).toast


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
    const toast = (await import('react-toastify')).toast

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
              className="mt-3"
            >
              {isLoading ? 'Enviando...' : 'Enviar Imagem'}
            </Button>
          </form>

          <div id="image-preview-container" className="mt-2">
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
  )
}
