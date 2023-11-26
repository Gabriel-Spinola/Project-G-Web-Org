import React from 'react'

export default function CreateProjectFormSkeleton() {
  return (
    <section
      id="form-section"
      className="flex flex-col w-full items-center justify-center gap-4 mt-16 p-4 rounded-xl bg-medium-gray"
    >
      <div className="w-full h-10 p-2 rounded-md bg-pure-white"></div>
      <div className="w-full h-64 p-2 rounded-md bg-pure-white"></div>
      <div className="flex gap-8">
        <div className="p-2 flex w-[240px] h-11 bg-darker-white text-medium-primary rounded-sm"></div>
        <div className="p-2 flex w-[240px] h-11 bg-darker-white text-medium-primary rounded-sm"></div>
      </div>
      <div className="hover:cursor-pointer px-16 py-2 h-11 rounded-sm text-medium-primary bg-darker-white">
        Criar Projeto
      </div>
    </section>
  )
}
