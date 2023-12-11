'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { FaEdit } from 'react-icons/fa'

export function UpdateProject({ id }: { id: string }) {
  const router = useRouter()

  return (
    <>
      <button
        type="button"
        onClick={() => {
          router.push(`/project/mutate/${id}`)
        }}
        className="w-full h-8 flex justify-center items-center"
      >
        <FaEdit size={20} />
      </button>
    </>
  )
}
