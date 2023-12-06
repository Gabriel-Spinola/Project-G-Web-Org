'use client'

import { handlePostDeletion } from '@/app/(feed)/_actions'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  onClose: () => void
  isOpen: boolean
  postId: string
}

export default function ConfirmDeleteModal({ isOpen, onClose, postId }: Props) {
  const router = useRouter()
  const pathName = usePathname()

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'md'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Realmente deseja apagar esta publicação?</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex justify-between">
          <button
            onClick={async () => {
              const toast = (await import('react-toastify')).toast

              await toast.promise(
                handlePostDeletion(postId, () => {
                  router.push(`${pathName}?delete=${postId}`, {
                    scroll: false,
                  })
                }),
                {
                  pending: 'Apagando seu post...',
                  success: 'Post apagado. 👌',
                  error: 'Houve um erro ao deletar seu post! 🤯',
                },
              )
            }}
            className="flex gap-4 px-6 py-2 rounded-md items-center border-2 hover:bg-[#f87171] hover:text-[#450a0a]"
          >
            Excluir
          </button>

          <button
            className="flex gap-4 px-6 py-2 rounded-md items-center border-2 hover:bg-darker-white"
            onClick={onClose}
          >
            Cancelar
          </button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
