'use client'

import React from 'react'
import { MdComment } from 'react-icons/md'

export function CommentProjectButton() {
  return (
    <button
      className={`like flex flex-col justify-center items-center w-[48px] text-darker-white`}
    >
      <MdComment size={24} />
    </button>
  )
}
