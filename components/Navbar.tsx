import { NavLinks } from '@/constants'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import AuthProvider from './AuthProvider'

console.log('first')

function Navbar() {
  return (
    <nav>
      {/* {session?.user ? <>{session?.user}</> : <></>} */}

      <AuthProvider />

      <ul>
        {NavLinks.map((link) => (
          // eslint-disable-next-line react/jsx-key
          <li>
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
