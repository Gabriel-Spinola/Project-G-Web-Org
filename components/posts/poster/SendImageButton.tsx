import React, { ChangeEvent } from 'react'

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function SendImageButton({ onChange }: Props) {
  return (
    <div className="notClose img-btn mr-[280px]">
      <button className="notClose p-1 relative overflow-hidden flex flex-row mt-8 text-medium-primary select-none text-sm hover:text-darker-white border-solid border-darker-white border-2 rounded bg-darker-white hover:bg-medium-primary hover:border-medium-primary">
        <i className="notClose importImg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="notClose mr-2"
          >
            <path
              fill="currentColor"
              d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14Zm1-2h12l-3.75-5l-3 4L9 13l-3 4Zm-1 2V5v14Z"
            />
          </svg>
        </i>
        <input
          type="file"
          name="images"
          accept=".png, .jpg, .jpeg, .webp"
          className="notClose absolute left-0 top-1 scale-150 scale-y-150 opacity-0"
          onChange={onChange}
          multiple
        />
        Envie uma imagem
      </button>
    </div>
  )
}
