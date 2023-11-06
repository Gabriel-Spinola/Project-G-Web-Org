/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import { Img } from '@chakra-ui/react'

import ExploreSearchBar from './FindObject'
import Carousel from './Carousel'

export default function UpperSection() {
  return (
    <div className="h-[95vh] w-[100%] flex flex-col items-center">
      <section className="absolute z-[1] flex flex-col gap-32 my-24">
        <ExploreSearchBar />
        <Carousel />
      </section>

      <div className="absolute h-[95vh] w-[100%] bg-black/75" />
      <Img
        className="h-full w-full object-cover object-center"
        src="/assets/explore/photo-1619615713569-fe374aad7185.jpg"
        alt="fundo"
      />
    </div>
  )
}
