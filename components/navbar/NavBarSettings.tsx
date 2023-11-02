import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { signOut } from 'next-auth/react'
import { RiLogoutBoxLine } from 'react-icons/ri'

interface Props {
  className: string
}

export default function NavBarSettings({ className }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <button className={className} onClick={onOpen}>
        <BsThreeDotsVertical />
      </button>
      <Modal isOpen={isOpen} onClose={onClose} size={'xs'} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bgColor={'#262626'}
            textColor={'#ebebeb'}
            roundedTop={'md'}
          >
            Configurações
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody
            bgColor={'#262626'}
            textColor={'#ebebeb'}
            roundedBottom={'md'}
          >
            <button
              onClick={() => signOut()}
              className="w-full p-2 flex justify-start rounded-md gap-4 bg-light-gray hover:bg-darker-gray hover:cursor-pointer"
            >
              <RiLogoutBoxLine size={24} />
              Sair da Conta
            </button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
