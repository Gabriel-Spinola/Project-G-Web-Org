'use client'

import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Editable,
  EditablePreview,
  EditableInput,
  Divider,
  FormLabel,
  EditableTextarea,
} from '@chakra-ui/react'
import { User } from 'next-auth'
import React, { FormEvent, useState } from 'react'

interface Params {
  user: User
}

type TestOfResponseType = {
  message: string
  operation: string
}

const defaultEditFormValues = {
  title: 'Insira seu titulo',
  description: 'Insira uma descrição',
}

export default function DisplayUserInfo({ user }: Params): React.JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()

  async function handleFormSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    // Helper function to get a field's value or default to an empty string
    const getFieldValueOrDefault = (
      fieldName: string,
      defaultValue: string,
    ) => {
      const fieldValue = formData.get(fieldName) as string | null

      return fieldValue === defaultValue ? '' : fieldValue
    }

    // Update form data for 'title' field
    formData.set(
      'title',
      getFieldValueOrDefault('title', defaultEditFormValues.title) ?? '',
    )

    // Update form data for 'description' field
    formData.set(
      'description',
      getFieldValueOrDefault(
        'description',
        defaultEditFormValues.description,
      ) ?? '',
    )

    try {
      const response = await fetch(
        `${API_URL}${API_ENDPOINTS.handlers.updateUser}?id=${user.id}`,
        {
          method: 'PUT',
          body: formData,
        },
      )

      if (!response.ok) {
        console.error('Response not okay')
      }

      const { message, operation }: Partial<TestOfResponseType> =
        await response.json()

      console.log(message)
      console.log(operation)
    } catch (error: unknown) {
      console.error(error)
    }
  }

  return (
    <section id="user-info">
      <h1>{user?.name}</h1>
      <h2>{user?.title || ''}</h2>
      <p>{user?.description || ''}</p>

      <br />
      <hr />
      <br />

      <h1>Linkedin: {user?.linkedinUrl || ''}</h1>
      <h1>Site: {user?.siteUrl}</h1>
      <h1>phone: {user?.contactPhone}</h1>
      <h1>email: {user?.email}</h1>

      <Button onClick={onOpen}>Editar Usuário</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleFormSubmission}>
            <ModalBody>
              <FormLabel>Name</FormLabel>
              <Editable defaultValue={user?.name || ''}>
                <EditablePreview />
                <EditableInput type="text" name="name" id="name" />
              </Editable>

              <FormLabel>Title</FormLabel>
              <Editable
                defaultValue={user?.title || defaultEditFormValues.title}
                isPreviewFocusable={true}
              >
                <EditablePreview />
                <EditableInput
                  display="insira um titolu"
                  type="text"
                  name="title"
                  id="title"
                />
              </Editable>

              <FormLabel>Description</FormLabel>
              <Editable
                defaultValue={
                  user?.description || defaultEditFormValues.description
                }
              >
                <EditablePreview />
                <EditableTextarea name="description" id="description" />
              </Editable>

              <Divider />
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>

              <Button colorScheme="blue" mr={3} type="submit">
                Salvar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </section>
  )
}
