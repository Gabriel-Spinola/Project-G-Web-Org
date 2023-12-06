'use client'

import { UserData } from '@/lib/types/common'
import { EditIcon } from '@chakra-ui/icons'
import { Button, useDisclosure } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React from 'react'

const DynamicEditUserModal = dynamic(() => import('./EditUserModal'), {
  ssr: true,
})

interface Params {
  user: Partial<UserData>
}

export default function EditUserInfo({ user }: Params) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <Button onClick={onOpen} colorScheme="orange">
        <EditIcon />
      </Button>

      <DynamicEditUserModal isOpen={isOpen} onClose={onClose} user={user} />
    </div>
  )
}
