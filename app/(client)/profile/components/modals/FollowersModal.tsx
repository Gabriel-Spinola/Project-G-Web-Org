'use client'

import { UserData } from '@/lib/types/common'
import {
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import UserContainer from './UserContainer'

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
          size={'xl'}
          isCentered
        >
          <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />

          <ModalContent className="flex flex-col items-center">
            <ModalHeader>
              <h2>Seguidores:</h2>
              <ModalCloseButton />
            </ModalHeader>

            <Divider />

            <ModalBody
              className="flex flex-col items-center w-full"
              height={'100%'}
              padding={8}
            >
              {followers.map((follow) => (
                <UserContainer
                  key={follow.follower.id}
                  user={follow.follower}
                />
              ))}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}
