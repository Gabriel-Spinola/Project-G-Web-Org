/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import Searchbar from '@/components/Searchbar'

export default function ExploreSearchBar() {
  return (
    <div className="flex flex-col items-center w-full justify-around gap-24">
      <h1 className="text-4xl text-darker-white tracking-wide font-semibold text-center w-[90%]">
        PROCURE POR SEUS
        <span className="text-medium-primary"> PROJETOS</span> E
        <span className="text-medium-primary"> ARTISTAS</span> PREFERIDOS
      </h1>
      <div className="w-[95%] md:w-[70%] x1:w-[50%] h-12">
        <Searchbar />
      </div>
    </div>
  )
}
