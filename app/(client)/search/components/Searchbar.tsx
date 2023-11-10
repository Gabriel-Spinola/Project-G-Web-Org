import { RedirectType, redirect } from 'next/navigation'
import React from 'react'

export default function Searchbar() {
  return (
    <div>
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
      >
        <input type="text" name="search-query" required />
        <button type="submit">Pesquisar</button>
      </form>
    </div>
  )
}
