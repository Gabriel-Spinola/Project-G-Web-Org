/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import { Image } from '@chakra-ui/react'
import ExploreSearchBar from './components/FindObject'
import Carousel from './components/Carousel'

export default function UpperSection() {
  return (
    <div className="h-[95vh] w-[100%] flex flex-col items-center">
      <section className="absolute z-[1] flex flex-col gap-32 my-24">
        <ExploreSearchBar />
        <Carousel />
      </section>

      <div className="absolute h-[95vh] w-[100%] bg-black/75" />
      <Image
        className="h-full w-full object-cover object-center"
        src="https://images.unsplash.com/photo-1619615713569-fe374aad7185?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
        alt="fundo"
      />
    </div>
  )
}
