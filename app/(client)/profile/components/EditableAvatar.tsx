'use client'

import SendImageButton from '@/components/Buttons/SendImageButton'
import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
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

type Props = {
  profilePicUrl: string
}

export default function EditableAvatar({ profilePicUrl }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [image, setImages] = useState<File | undefined>(undefined)

  async function handleFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    try {
      console.log('sending img')
      const response = await fetch(
        `${API_URL}${API_ENDPOINTS.services.users}/image/?id=admin`,
        {
          method: 'PUT',
          body: formData,
          headers: {
            'X-API-Key': process.env.API_SECRET as string,
          },
        },
      )

      const { data } = await response.json()

      if (!response.ok) {
        throw new Error('response not ok' + JSON.stringify(data))
      }

      console.log('worked ' + JSON.stringify(data))

      setImages(undefined)
      onClose()
    } catch (error: unknown) {
      alert('Failed to create post')

      console.error(error)
    }
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
      <Avatar size={'2xl'} src={profilePicUrl}></Avatar>

      <Button type="button" onClick={onOpen}>
        edit photo
      </Button>

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
