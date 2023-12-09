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
  followers?: { follower: Partial<UserData> }[]
  followersSpan: ReactNode
}

export default function FollowersModal({ followers, followersSpan }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleOpenModalCallback() {
    if (!followers || followers?.length <= 0) {
      return
    }

    return onOpen()
  }

  return (
    <div className="flex flex-col">
      <div className="hover:cursor-pointer" onClick={handleOpenModalCallback}>
        {followersSpan}
      </div>

      {followers && (
        <Modal
          isOpen={isOpen as boolean}
          onClose={onClose as () => void}
          size={'4xl'}
          isCentered
        >
          <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />

          <ModalContent>
            <ModalHeader>
              <h2>Seguidores:</h2>
              <ModalCloseButton />
            </ModalHeader>

            <ModalBody height={'100%'} padding={8}>
              <DisplayUsers
                users={followers.map((follower) => follower.follower)}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}
