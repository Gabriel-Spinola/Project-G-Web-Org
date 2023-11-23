/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import { Img } from '@chakra-ui/react'
import Link from 'next/link'

type CarouselData = {
  content: string
  imgUrl: string
}

const carouselData: Array<CarouselData> = [
  {
    content: 'Engenharia',
    imgUrl: '/assets/explore/photo-1562185363-aa9551ce00d4.webp',
  },
  {
    content: 'Arquitetura',
    imgUrl: '/assets/explore/photo-1612387290123-34af734b5f61.webp',
  },
  {
    content: 'Arte Urbana',
    imgUrl: '/assets/explore/photo-1591874204276-1ebd20fb8db6.webp',
  },
]

export default function CarouselItems() {
  return (
    <div className="flex gap-10 align-middle justify-center">
      {carouselData.map((data, index) => (
        <Link
          key={index}
          href="/"
          id="item-1"
          className="max-w-[500px] md:w-[28vw] max-h-[260px] bg-darker-white rounded-xl "
        >
          <Img
            src={data.imgUrl}
            className={`h-full w-full object-cover rounded-xl duration-300 hover:brightness-50 hover:after:content-[${data.content}]`}
            alt="Kobra Graffiti"
          />
        </Link>
      ))}
    </div>
  )
}
