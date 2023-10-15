'use client'

import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import DeletePostButton from '../Buttons/DeletePostButton'
import EditPostButton from '../Buttons/EditPostButton'

interface Props {
  postId: string
}

export default function OwnerSettings({ postId }: Props) {
  const [dropDownMenu, setDropDownMenu] = useState(false)
  function ToggleDropDownMenu() {
    setDropDownMenu(!dropDownMenu)
  }
  return (
    <section>
      <button onClick={ToggleDropDownMenu}>
        <BsThreeDotsVertical size={'24'} />
      </button>
      {dropDownMenu ? (
        <ul className="absolute py-4 bg-light-gray text-darker-white rounded-lg">
          <li className="p-2 bg-light-gray hover:bg-darker-gray">
            <EditPostButton postId={postId} />
          </li>
          <li className="w-full p-2 bg-light-gray hover:bg-darker-gray">
            <DeletePostButton postId={postId} />
          </li>
        </ul>
      ) : (
        ''
      )}
    </section>
  )
}
