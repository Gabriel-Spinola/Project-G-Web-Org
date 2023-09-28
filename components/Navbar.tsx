'use client'

import Image from 'next/image'
import React from 'react'
import '@/app/styles/navbar.scss'
import Routes from './Router'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav
      id="header-nav"
      className="shadow-darker-white/40 shadow-2xl flex justify-around bg-medium-gray text-darker-white h-[88px] items-center text-xl"
    >
      <ul className="flex flex-row">
        <li>
          <Link to="/explore">
            Explorar
            <div></div>
          </Link>
        </li>
        <li>
          <Link to="/projects">
            Projetos
            <div></div>
          </Link>
        </li>
        <li>
          <Link to="/">
            <Image
              src="/assets/logo.png"
              alt="logo-image"
              width={200}
              height={50}
            />
          </Link>
        </li>
        <li>
          <Link to="rchitects">
            Arquitetos
            <div></div>
          </Link>
        </li>
        <li>
          <Link to="profile/">
            Perfil
            <div></div>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default Navbar
