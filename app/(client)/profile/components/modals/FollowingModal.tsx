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
import React, { ReactNode } from 'react'

type Props = {
  following?: { following: Partial<UserData> }[]
  followingSpan: ReactNode
}

export default function FollowingModal({ following, followingSpan }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleOpenModalCallback() {
    if (!following || following?.length <= 0) {
      return
    }

    return onOpen()
  }

  return (
    <div>
      <div onClick={handleOpenModalCallback}>{followingSpan}</div>

      {following && (
        <Modal
          isOpen={isOpen as boolean}
          onClose={onClose as () => void}
          size={'4xl'}
          isCentered
        >
          <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />

          <ModalContent>
            <ModalHeader>
              <h2>Seguindo:</h2>
              <ModalCloseButton />
            </ModalHeader>

            <ModalBody height={'100%'} padding={8}>
              <DisplayUsers
                users={following.map((following) => following.following)}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}
