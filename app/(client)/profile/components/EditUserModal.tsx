'use client'

import { UserData } from '@/lib/types/common'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormLabel,
  Editable,
  EditableTextarea,
  EditablePreview,
  Icon,
  EditableInput,
  Divider,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { BsFillPinMapFill, BsFillTelephoneFill } from 'react-icons/bs'
import { FaLinkedin } from 'react-icons/fa'
import { TbWorldCode } from 'react-icons/tb'
import { updateUserInfo } from '../_actions'
import { EditIcon } from '@chakra-ui/icons'

type Props = {
  user: Partial<UserData>
}

export default function EditUserModal({ user }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleFormSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const toast = (await import('react-toastify')).toast
    const formData = new FormData(event.currentTarget)

    const newName = formData.get('name')?.toString()
    const newDescription = formData.get('description')?.toString()
    const newLocation = formData.get('location')?.toString()
    const newSiteUrl = formData.get('site-url')?.toString()
    const newPhone = formData.get('phone')?.toString()
    const newLinkedinUrl = formData.get('linkedin')?.toString()

    const newUserInfo: Partial<User> = {
      id: user.id,
      name: newName,
      description: newDescription,
      location: newLocation,
      siteUrl: newSiteUrl,
      contactPhone: Number(newPhone),
      linkedinUrl: newLinkedinUrl,
    }

    setIsLoading(false)

    const { error } = await toast.promise(updateUserInfo(newUserInfo), {
      pending: 'Editando perfil',
    })

    setIsLoading(false)

    if (error) {
      toast.error('Falha ao atualizar suas informações 😔')

      return
    }

    toast.success('Suas informações foram atualizadas com sucesso! 👌')
    router.replace(`/profile/${user.id}/`, { scroll: false })
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="orange">
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Editar meus dados</ModalHeader>
          <form onSubmit={handleFormSubmission}>
            <ModalBody className="flex flex-col gap-4">
              <div>
                <FormLabel>Nome de exibição</FormLabel>
                <Editable
                  defaultValue={user.name?.toString()}
                  isPreviewFocusable={true}
                >
                  <EditableTextarea name="name" id="name" />

                  <EditablePreview />
                </Editable>
              </div>

              <div>
                <FormLabel>Descrição</FormLabel>
                <Editable
                  defaultValue={
                    user.description?.toString() || 'Sua descrição...'
                  }
                  isPreviewFocusable={true}
                >
                  <EditableTextarea name="description" id="description" />

                  <EditablePreview />
                </Editable>
              </div>

              <div className="py-2">
                <FormLabel>
                  <Icon as={BsFillPinMapFill} w={6} h={6} /> Localização:
                </FormLabel>

                <Editable
                  defaultValue={user.location?.toString() || 'Sua localização'}
                  isPreviewFocusable={true}
                >
                  <EditableInput type="text" name="location" id="location" />
                  <EditablePreview />
                </Editable>
              </div>

              <Divider />

              <div className="py-2">
                <FormLabel>
                  <Icon as={FaLinkedin} w={6} h={6} /> Linkedin:
                </FormLabel>

                <Editable
                  defaultValue={
                    user.siteUrl?.toString() || 'Link para seu linkedin'
                  }
                  isPreviewFocusable={true}
                >
                  <EditableInput type="text" name="linkedin" id="linkedin" />
                  <EditablePreview />
                </Editable>
              </div>

              <div className="py-2">
                <FormLabel>
                  <Icon as={TbWorldCode} w={6} h={6} /> Site:
                </FormLabel>

                <Editable
                  defaultValue={user.siteUrl?.toString() || 'Seu website'}
                  isPreviewFocusable={true}
                >
                  <EditableInput type="text" name="site-url" id="site-url" />
                  <EditablePreview />
                </Editable>
              </div>

              <div className="py-2">
                <FormLabel>
                  <Icon as={BsFillTelephoneFill} w={6} h={6} /> Telefone:
                </FormLabel>

                <Editable
                  defaultValue={
                    user.contactPhone?.toString() ||
                    'Seu telefone ou celular de contato'
                  }
                  isPreviewFocusable={true}
                >
                  <EditableInput type="number" name="phone" id="phone" />
                  <EditablePreview />
                </Editable>
              </div>

              <Divider />
            </ModalBody>

            <ModalFooter>
              <Button className="mr-2" variant="ghost" onClick={onClose}>
                Cancelar
              </Button>

              <Button
                disabled={isLoading}
                colorScheme="orange"
                mr={3}
                type="submit"
              >
                {isLoading ? 'Enviando...' : 'Salvar'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
