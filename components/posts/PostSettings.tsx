import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiSolidShare } from 'react-icons/bi'
import { AiFillWarning } from 'react-icons/ai'
import DeletePostButton from '../Buttons/DeletePostButton'
import { $Enums } from '@prisma/client'

interface Props {
  postId: string
  isOwner: boolean
  currentUserPosition: $Enums.Positions | undefined
}

export default function PostSettings({
  postId,
  isOwner,
  currentUserPosition,
}: Props) {
  const [dropDownMenu, setDropDownMenu] = useState(false)

  const dropDownMenuRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownMenuRef.current &&
        !dropDownMenuRef.current.contains(e.target as Node)
      ) {
        setDropDownMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropDownMenuRef])

  return (
    <section className="z-[999]">
      <button
        onClick={() => {
          setDropDownMenu(!dropDownMenu)
        }}
      >
        <BsThreeDotsVertical size={'24'} />
      </button>
      {dropDownMenu ? (
        <ul
          className="absolute py-4 px-1 bg-light-gray  text-darker-white rounded-lg"
          ref={dropDownMenuRef}
        >
          <li className="w-full p-2 flex gap-4 bg-light-gray hover:bg-darker-gray hover:cursor-pointer">
            <BiSolidShare size={20} />
            Compartilhar publicação
          </li>
          {!isOwner ? (
            <li className="w-full p-2 flex gap-4 bg-light-gray hover:bg-darker-gray hover:cursor-pointer">
              <AiFillWarning size={20} />
              Denunciar publicação
            </li>
          ) : null}
          {isOwner || currentUserPosition === $Enums.Positions.Admin ? (
            <li className="w-full p-2 bg-light-gray hover:bg-darker-gray">
              <DeletePostButton postId={postId} />
            </li>
          ) : null}
        </ul>
      ) : null}
    </section>
  )
}
