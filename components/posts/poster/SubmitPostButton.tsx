import React from 'react'

export default function SubmitPostButton() {
  return (
    <div className="notClose submit">
      <button className="pl-8 pr-8 h-[36px] notClose p-1 relative overflow-hidden flex flex-row mt-8 text-medium-primary select-none text-sm hover:text-darker-white border-solid border-darker-white border-2 rounded bg-darker-white hover:bg-medium-primary hover:border-medium-primary">
        Publicar
        <input
          type="submit"
          className="notClose absolute p-8 left-4 top-1 scale-150 scale-y-150 opacity-100"
        ></input>
      </button>
    </div>
  )
}
