'use client'

import React from 'react'
import { deleteProject } from '../_actions'
import { FaTrash } from 'react-icons/fa'

export function DeleteProject({ id }: { id: string }) {
  return (
    <button
      type="button"
      className="w-full h-8 flex justify-center items-center"
      onClick={async () => {
        const { data, error } = await deleteProject(id)

        if (error || !data) {
          console.error(error)
        }

        console.log(data)
      }}
    >
      <FaTrash size={20} />
    </button>
  )
}
