'use client'

import React from 'react'
import { deleteProject } from '../_actions'
import { useRouter } from 'next/navigation'

export function DeleteProject({ id }: { id: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        const { data, error } = await deleteProject(id)

        if (error || !data) {
          console.error(error)
        }

        console.log(data)
      }}
    >
      Delete project
    </button>
  )
}

export function UpdateProject({ id }: { id: string }) {
  const router = useRouter()

  return (
    <>
      <button
        type="button"
        onClick={() => {
          router.push(`/project/mutate/${id}`)
        }}
      >
        Update Project
      </button>
    </>
  )
}
