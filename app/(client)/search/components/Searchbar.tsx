'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export default function Searchbar() {
  const router = useRouter()

  return (
    <div>
      <form
        method="GET"
        onSubmit={(event) => {
          event.preventDefault()

          const formData = new FormData(event.currentTarget)
          const searchQuery = formData.get('search-query')

          router.replace(`/search/${searchQuery?.toString() ?? ''}`, {
            scroll: false,
          })
        }}
      >
        <input type="text" name="search-query" required />
        <button type="submit">Pesquisar</button>
      </form>
    </div>
  )
}
