/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import styles from './exploreCarousel.module.scss'
import SearchBar from '../../Search/searchBar'

export default function ExploreSearchBar() {
  return (
    <div className="flex flex-col items-center w-full justify-around gap-24">
      <h1 className="text-4xl text-darker-white tracking-wide font-semibold text-center w-[90%]">
        PROCURE POR SEUS
        <span className={styles.highlightText}> PROJETOS</span> E
        <span className={styles.highlightText}> ARTISTAS</span> PREFERIDOS
      </h1>
      <SearchBar />
    </div>
  )
}
