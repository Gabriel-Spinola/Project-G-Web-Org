import React from 'react'
import { BiComment } from 'react-icons/bi'

export default function ChatButton() {
  return (
    <div
      id="comment-button"
      className="fixed bottom-0 w-12 h-12 flex items-center justify-center right-14 text-pure-white bg-medium-primary p-5 rounded-full mb-6"
    >
      <button>
        <BiComment size={24} />
      </button>
    </div>
  )
}
