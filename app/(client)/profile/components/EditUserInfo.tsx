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
  isOwner: boolean
  user: Partial<UserData>
}

export default function EditUserInfo(params: Params) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {params.isOwner && (
        <Button onClick={onOpen} colorScheme="orange">
          <EditIcon />
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Editar meus dados</ModalHeader>
          <form>
            <ModalBody visibility={params.isOwner ? 'visible' : 'hidden'}>
              <FormLabel>Telefone</FormLabel>

              <Editable
                defaultValue={
                  params.user.contactPhone?.toString() ?? '(xx) xxxx-xxxx'
                }
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
              <Editable defaultValue={'Sua localização'}>
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
    </>
  )
}
