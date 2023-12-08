'use client'

import DisplayUsers from '@/app/(client)/search/_components/DisplayUsers'
import { UserData } from '@/lib/types/common'
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

type Props = {
  users: Partial<UserData>
  followersCount: number
}

export default function FollowersModal({ users, followersCount }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <span onClick={onOpen} className="text-center">
        <span className="font-bold">{followersCount}</span> Seguidores
      </span>

      <Modal
        isOpen={isOpen as boolean}
        onClose={onClose as () => void}
        size={'4xl'}
        isCentered
      >
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody height={'100%'} padding={8}>
            <DisplayUsers users={[users]} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
