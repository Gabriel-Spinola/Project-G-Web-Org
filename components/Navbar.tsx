import { NavLinks } from '@/constants'
import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <nav>
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