'use client'

import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { handlePostDeletion } from '@/app/(feed)/_actions'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter()
  const pathName = usePathname()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // TODO - Ask for confirmation before deleting the post
  return (
    <>
      <li onClick={onOpen} className="w-full flex gap-4 justify-start">
        <FaTrash size={20} />
        Excluir
      </li>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'md'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Realmente deseja apagar esta publicação?</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex justify-between">
            <button
              onClick={async () => {
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
    </>
  )
}
