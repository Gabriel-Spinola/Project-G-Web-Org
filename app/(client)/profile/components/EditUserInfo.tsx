'use client'

import { UserData } from '@/lib/types/common'
import dynamic from 'next/dynamic'
import React from 'react'

const DynamicEditUserModal = dynamic(() => import('./EditUserModal'), {
  ssr: true,
})

interface Params {
  user: Partial<UserData>
  isOwner: boolean
}

export default function EditUserInfo({ user, isOwner }: Params) {
  return <div>{isOwner && <DynamicEditUserModal user={user} />}</div>
}
