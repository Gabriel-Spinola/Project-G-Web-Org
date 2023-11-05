import Link from 'next/link'
import React from 'react'

export default function UserProjects() {
  return (
    <section className="w-full flex flex-col gap-8">
      <h2 className=" text-center text-xl font-bold">Projetos</h2>
      <div className="w-full h-full flex lg:flex-col gap-4 lg:gap-8">
        <div className="h-32 w-full rounded-xl bg-medium-secundary"></div>
        <div className="h-32 w-full rounded-xl bg-medium-tertiary"></div>
      </div>
      <Link href="/">
        <h2 className="text-center text-xl font-bold underline">Ver Mais</h2>
      </Link>
    </section>
  )
}
