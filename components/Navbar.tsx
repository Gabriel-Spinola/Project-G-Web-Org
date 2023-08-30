import { NavLinks } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import '@/app/styles/navbar.scss'

async function Navbar() {
  return (
    <nav className='shadow-darker-white/40 shadow-2xl'>
      <ul>
        {NavLinks.map((link) => (
          // eslint-disable-next-line react/jsx-key
          <li>
            <Link href={link.href} key={link.key}>
              {link.text}
              {link.key == "Home" &&
              <Image
                src='/assets/logo.png'
                alt='Logo'
                width={220}
                height={31}
              />}
            </Link>
          </li>
        ))}

        <div className='right-wing flex flex-row'>
          {NavLinks.filter(link => link.key === 'Architects' || link.key === 'Profile').map(link => (
            <li key={link.key}>{link.text}</li>
          ))}
        </div>
      </ul>
    </nav>
  )
}

export default Navbar
