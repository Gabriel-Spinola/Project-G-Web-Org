import React, { ChangeEvent } from 'react'
import { AiOutlineFileImage } from 'react-icons/ai'

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function SendImageButton({ onChange }: Props) {
  return (
    <div className="img-btn hover:cursor-pointer z-50">
      <input
        type="file"
        name="display-images"
        id="images"
        accept=".png, .jpg, .jpeg, .webp"
        className="hidden"
        onChange={onChange}
      />
      <label
        htmlFor="images"
        className="p-2 flex w-[240px] bg-darker-white text-medium-primary hover:bg-medium-primary hover:text-darker-white cursor-pointer rounded-sm"
      >
        <AiOutlineFileImage size={28} />
        Envie uma Imagem
      </label>
    </div>
  )
}
