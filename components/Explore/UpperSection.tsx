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
import Carousel from './components/carousel'

export default function UpperSection() {
  return (
    <div className="h-[100vh] w-[100%] flex flex-col items-center">
      <section className="absolute z-[1] items-center justify-around">
        <ExploreSearchBar />
        <Carousel />
      </section>

      <div className="absolute h-[100vh] w-[100%] bg-black/50" />
      <Image
        className="h-full w-full object-cover"
        src="https://ebqqbabyixbmiwalviko.supabase.co/storage/v1/object/public/Vampeta-Images-Public/static-images/kirill-mikhaylyuk-bX23L46B1m4-unsplash.jpg"
        alt="fundo"
      />
    </div>
  )
}
