import { Icon } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

export default function Carousel() {
  return (
    <div id="carousel" className="flex gap-4 items-center">
      <ArrowLeftIcon w={8} h={8} color={'white'} />
      <div
        id="item-1"
        className="w-[295px] h-[261px] bg-darker-white rounded-xl"
      ></div>
      <div
        id="item-1"
        className="w-[295px] h-[261px] bg-darker-white rounded-xl"
      ></div>
      <div
        id="item-1"
        className="w-[295px] h-[261px] bg-darker-white rounded-xl"
      ></div>
      <div
        id="item-1"
        className="w-[295px] h-[261px] bg-darker-white rounded-xl"
      ></div>
      <div
        id="item-1"
        className="w-[295px] h-[261px] bg-darker-white rounded-xl"
      ></div>
      <ArrowRightIcon w={8} h={8} color={'white'} />
    </div>
  )
}
