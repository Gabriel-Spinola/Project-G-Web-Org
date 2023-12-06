'use client'

import React from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'
import dynamic from 'next/dynamic'

const DynamicDeleteModal = dynamic(() => import('./ConfirmDeleteModal'), {
  ssr: false,
})

export default function DeletePostButton({ postId }: { postId: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // TODO - Ask for confirmation before deleting the post
  return (
    <>
      <li onClick={onOpen} className="w-full flex gap-4 justify-start">
        <FaTrash size={20} />
        Excluir
      </li>

      <DynamicDeleteModal isOpen={isOpen} onClose={onClose} postId={postId} />
    </>
  )
}

// 301 -> 265 ->
