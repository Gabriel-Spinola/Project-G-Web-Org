import Image from 'next/image'
import React from 'react'
import '@/app/styles/navbar.scss'
const Navbar = () => {
  return (
    <nav
      id="header-nav"
      className="shadow-darker-white/40 shadow-2xl flex justify-around bg-medium-gray text-darker-white h-[88px] items-center text-xl"
    >
      <ul className="flex flex-row">
        <li>
          <a href="../client/explore">
            Explorar
            <div></div>
          </a>
        </li>
        <li>
          <a href="../client/projects">
            Projetos
            <div></div>
          </a>
        </li>
        <li>
          <a href="/">
            <Image
              src="/assets/logo.png"
              alt="logo-image"
              width={200}
              height={50}
            />
          </a>
        </li>
        <li>
          <a href="../client/search">
            Busca
            <div></div>
          </a>
        </li>
        <li>
          <a href="../client/profile/[id]">
            Perfil
            <div></div>
          </a>
        </li>
      </ul>
    </nav>
  )
}
export default Navbar
