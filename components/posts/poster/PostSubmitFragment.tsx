/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import React, { useState, Fragment } from 'react'

import Modal from '@/components/posts/poster/Modal'
import '@/components/posts/poster/style.scss'

export default function PostSubmitFragment() {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <Fragment>
      <button
        className="poster-button w-[809px] h-[64px] bg-medium-gray text-darker-white text-xl text-left rounded-[8px] pl-8 hover:text-medium-primary mt-8 mb-8"
        onClick={() => setShowModal(true)}
      >
        Faça uma publicação
        <span className="w-[14px] h-[2px] bg-darker-white hover:bg-medium-primary hover:grow"></span>
      </button>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}></Modal>
    </Fragment>
  )
}
