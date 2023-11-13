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
      className=""
    >
      <input
        type="text"
        name="search-query"
        className="bg-medium-primary"
        required
      />
      <button type="submit">Pesquisar</button>
    </form>
  )
}
