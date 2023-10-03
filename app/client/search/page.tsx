/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import FilterSearchComponent from '@/components/Search/filterSearchComponent'
import SearchBar from '@/components/Search/searchBar'
import React from 'react'

export default function SearchPage() {
  return (
    <main className="min-h-full flex flex-col justify-center items-center bg-darker-white">
      <section
        id="search-mechanism"
        className="p-8 flex flex-col justify-center items-start"
      >
        <SearchBar />
        <FilterSearchComponent />
      </section>
    </main>
  )
}
