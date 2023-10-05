import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <nav
      id="header-nav"
      className="flex justify-around w-full h-[88px] shadow-darker-white/40 shadow-2xl bg-medium-gray text-darker-white text-xl"
    >
      <ul className="flex items-center gap-8 text-xl font-light">
        <li>
          <a href="#" className="">
            <Image
              className=""
              src="https://ebqqbabyixbmiwalviko.supabase.co/storage/v1/object/public/Vampeta-Images-Public/visual-id/LOGO.png"
              alt="logo-image"
              width={200}
              height={50}
            />
          </a>
        </li>
        <li>
          <h1 className="text-2xl font-medium">TRY HACK ME</h1>
        </li>
        <li className="hover:text-pure-white hover:-translate-y-1">
          <a href="#">Introdução</a>
          <div className="h-[2px] w-full bg-darker-white" />
        </li>
        <li className="hover:text-pure-white hover:-translate-y-1">
          <a href="#">Funcionalidades</a>
          <div className="h-[2px] w-full bg-darker-white" />
        </li>
        <li className="hover:text-pure-white hover:-translate-y-1">
          <a href="#">Objetivo</a>
          <div className="h-[2px] w-full bg-darker-white" />
        </li>
        <li className="hover:text-pure-white hover:-translate-y-1">
          <a href="#">Feedback</a>
          <div className="h-[2px] w-full bg-darker-white" />
        </li>
      </ul>
    </nav>
  )
}
export default Navbar
