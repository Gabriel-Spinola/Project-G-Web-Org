import { RedirectType, redirect } from 'next/navigation'
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
        className="bg-pure-white w-full h-full p-2 rounded-xl"
      />
      <button type="submit" className="absolute px-2">
        Pesquisar
      </button>
    </form>
  )
}
