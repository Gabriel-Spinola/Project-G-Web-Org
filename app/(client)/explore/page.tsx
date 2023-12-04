/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import BottomSection from './components/BottomSection'
import ExploreSearchBar from './components/FindObject'
import CarouselItems from './components/Carousel'

export default function ExplorePage() {
  return (
    <main className="mt-[88px] flex flex-col align-top bg-darker-white justify-center items-center">
      {/* NOTE - Upper Section of page */}
      <section className="h-[95vh] w-[100%] first-letter:items-center">
        {/* NOTE - Upper Section Content Container */}
        <div className="absolute w-full z-[1] flex flex-col gap-32 my-24">
          <ExploreSearchBar />
          <CarouselItems />
        </div>
      </section>

      <BottomSection />
    </main>
  )
}
