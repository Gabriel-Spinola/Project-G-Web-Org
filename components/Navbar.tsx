import { NavLinks } from '@/constants'
import Link from 'next/link'
import React from "react"
import "@/app/styles/navbar.scss"

console.log("first")

function Navbar() {
  return (
    <nav className='header-nav'>
      <ul>
        {
          NavLinks.map((link) => (
            // eslint-disable-next-line react/jsx-key
            <li>
              <Link href={link.href} key={link.key}>{link.text}</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Navbar