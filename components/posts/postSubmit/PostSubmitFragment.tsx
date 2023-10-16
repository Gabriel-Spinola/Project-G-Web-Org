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

import styles from './PostSubmitFragment.module.scss'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { NewPostModal } from './PostSubmitForm'
import { signIn } from 'next-auth/react'

type Props = {
  revalidate?: () => void
  currentUserId?: string
}

export default function PostSubmitFragment({ currentUserId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <button
        className={`w-full my-8 p-8 bg-gradient-to-tl from-medium-tertiary to-medium-primary text-darker-white rounded-lg hover:font-semibold hover:text-light-gray hover:scale-[101%] text-start text-lg`}
        id={styles.textAnimation}
        onClick={onOpen}
      >
        Faça uma publicação
        <div id={styles.textSub}></div>
      </button>
      <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalHeader>Faça uma publicação</ModalHeader>
          <ModalCloseButton />

          <ModalBody height={'100%'}>
            {currentUserId ? (
              <NewPostModal
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
        </ModalContent>
      </Modal>
    </>
  )
}