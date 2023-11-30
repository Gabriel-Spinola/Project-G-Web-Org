'use client'

import { HiSearch } from 'react-icons/hi'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function Searchbar() {
  const router = useRouter()

  return (
    <form
      onSubmit={async function (event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const searchQuery = formData.get('search-query')

        router.push(`/search/${searchQuery?.toString() ?? ''}`)
      }}
      className="flex items-center justify-end w-full h-full rounded-xl shadow-sm"
    >
      <input
        type="text"
        name="search-query"
        className="bg-pure-white w-full h-full p-2 rounded-l-xl"
      />
      <button
        type="submit"
        className="h-full px-2 flex items-center justify-center gap-1 bg-pure-white hover:brightness-95 hover:text-medium-primary rounded-r-xl"
      >
        Pesquisar
        <HiSearch size={20} />
      </button>
    </form>
  )
}
