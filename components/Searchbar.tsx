import { RedirectType, redirect } from 'next/navigation'
import { HiSearch } from 'react-icons/hi'
import React from 'react'

export default function Searchbar() {
  return (
    <form
      method="GET"
      action={async function (formData: FormData) {
        'use server'

        const searchQuery = formData.get('search-query')

        redirect(
          `/search/${searchQuery?.toString() ?? ''}`,
          RedirectType.replace,
        )
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
