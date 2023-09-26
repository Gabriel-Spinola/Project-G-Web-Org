/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import { Icon, Image } from '@chakra-ui/react'
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md'
import styles from './explore.module.scss'

export default function Carousel() {
  return (
    <div className="flex flex-col gap-32 items-center">
      <section id="carousel" className="flex gap-4 items-center">
        <a
          href="/"
          id="item-1"
          className="w-[492px] h-[260px] flex bg-darker-white rounded-xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1562185363-aa9551ce00d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            className="h-full w-full object-cover rounded-xl"
            alt="Green double couch with wooden legs"
          />
          <div className={styles.hoverAnimation}>
            <p>ENGENHARIA</p>
          </div>
        </a>
        <a
          href="/"
          id="item-1"
          className="w-[492px] h-[260px] flex bg-darker-white rounded-xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1612387290123-34af734b5f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1972&q=80"
            className="h-full w-full object-cover rounded-xl"
            alt="Green double couch with wooden legs"
          />
          <div className={styles.hoverAnimation}>
            <p>ARQUITETURA</p>
          </div>
        </a>
        <a
          href="/"
          id="item-1"
          className="w-[492px] h-[260px] flex bg-darker-white rounded-xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1591874204276-1ebd20fb8db6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            className="h-full w-full object-cover rounded-xl"
            alt="Green double couch with wooden legs"
          />
          <div className={styles.hoverAnimation}>
            <p>ARTE URBANA</p>
          </div>
        </a>
      </section>
      <Icon
        as={MdOutlineKeyboardDoubleArrowDown}
        color={'#ebebeb'}
        w={12}
        h={12}
      />
    </div>
  )
}
