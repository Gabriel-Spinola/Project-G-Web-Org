import React from 'react'

export default function SubmitPostButton() {
  return (
    <div>
      <input
        type="submit"
        className="p-2 w-[240px] rounded-sm cursor-pointer bg-darker-white text-medium-primary hover:bg-medium-primary hover:text-darker-white"
      ></input>
    </div>
  )
}
