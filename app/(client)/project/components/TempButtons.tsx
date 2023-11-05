'use client'

import React from 'react'
import { deleteProject } from '../_actions'

export default function TempButtons({ id }: { id: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        const { data, error } = await deleteProject(id)

        if (error || !data) {
          console.log(error)
        }

        console.log(data)
      }}
    >
      Delete project
    </button>
  )
}
