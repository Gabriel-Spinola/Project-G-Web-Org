'use client'

import React from 'react'
import { deleteProject } from '../_actions'
import { FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export function DeleteProject({ id }: { id: string }) {
  const router = useRouter()

  return (
    <button
      type="button"
      className="w-full h-8 flex justify-center items-center"
      onClick={async () => {
        const toast = (await import('react-toastify')).toast
        const { data, error } = await toast.promise(deleteProject(id), {
          pending: 'Apagando projeto...',
        })

        if (error || !data) {
          console.error(error)

          toast.error('Houve um error ao apagar seu projeto 🤯.')
          return
        }

        toast.success('Projeto apagado com successo 👌')
        router.push('/project')
      }}
    >
      <FaTrash size={20} />
    </button>
  )
}
