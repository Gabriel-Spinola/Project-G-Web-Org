import { UserData } from '@/lib/types/common'
import { EditIcon } from '@chakra-ui/icons'
import {
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

interface Params {
  user: Partial<UserData>
}

export default function EditUserInfo({ user }: Params) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <Button onClick={onOpen} colorScheme="orange">
        <EditIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Editar meus dados</ModalHeader>
          <form>
            <ModalBody>
              <FormLabel>Telefone</FormLabel>
              <Editable
                defaultValue={user.contactPhone?.toString() ?? '(xx) xxxx-xxxx'}
                isPreviewFocusable={true}
              >
                <EditablePreview />
                <EditableInput
                  display="Seu núemro de celular"
                  type="text"
                  name="title"
                  id="title"
                />
              </Editable>

              <FormLabel>Localização</FormLabel>
              <Editable
                defaultValue={user.location?.toString() || 'Sua localização'}
              >
                <EditablePreview />
              </Editable>

              <FormLabel>Site</FormLabel>
              <Editable
                defaultValue={user.siteUrl?.toString() || 'Seu website'}
              >
                <EditablePreview />
              </Editable>

              <FormLabel>Email</FormLabel>
              <Editable
                defaultValue={user.email?.toString() || 'Seu email de contato'}
              >
                <EditablePreview />
              </Editable>

              <FormLabel>Telefone</FormLabel>
              <Editable
                defaultValue={
                  user.contactPhone?.toString() ||
                  'Seu telefone ou celular de contato'
                }
              >
                <EditablePreview />
              </Editable>

              <Divider />
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>

              <Button colorScheme="orange" mr={3} type="submit">
                Salvar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  )
}
