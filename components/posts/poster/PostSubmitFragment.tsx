/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import React from 'react'

import './PostSubmitFragment.module.scss'
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
} from '@chakra-ui/react'
import { FeedModal } from './Modal'
import { signIn } from 'next-auth/react'

type Props = {
  revalidate?: () => void
  currentUserId?: string
}

export default function PostSubmitFragment({
  revalidate,
  currentUserId,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Faça uma publicação</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {currentUserId ? (
              <FeedModal
                revalidate={revalidate}
                closeModal={onClose}
                currentUserId={currentUserId}
              />
            ) : (
              <>
                <h2>Primeiro faça login para espalhar sua criatividade!</h2>

                <Button onClick={() => signIn(undefined, { callbackUrl: '/' })}>
                  Login
                </Button>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
