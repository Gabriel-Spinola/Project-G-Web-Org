/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import { Icon } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md'

export default function Carousel() {
  return (
    <div className="flex flex-col gap-16">
      <section id="carousel" className="flex gap-4 items-center">
        <ArrowLeftIcon w={8} h={8} color={'white'} />
        <a
          href="/"
          id="item-1"
          className="w-[295px] h-[261px] bg-darker-white rounded-xl"
        ></a>
        <a
          href="/"
          id="item-2"
          className="w-[295px] h-[261px] bg-darker-white rounded-xl"
        ></a>
        <a
          href="/"
          id="item-3"
          className="w-[295px] h-[261px] bg-darker-white rounded-xl"
        ></a>
        <a
          href="/"
          id="item-4"
          className="w-[295px] h-[261px] bg-darker-white rounded-xl"
        ></a>
        <a
          href="/"
          id="item-5"
          className="w-[295px] h-[261px] bg-darker-white rounded-xl"
        ></a>
        <ArrowRightIcon w={8} h={8} color={'white'} />
      </section>
      <Icon as={MdOutlineKeyboardDoubleArrowDown} />
    </div>
  )
}
