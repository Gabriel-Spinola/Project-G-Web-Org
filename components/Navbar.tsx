import { NavLinks } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { getServerSession } from 'next-auth'
import '@/app/styles/navbar.scss'

async function Navbar() {
  return (
    <nav>
      {/* {session ? (
        <h1>session?.user</h1>
      ) : (
        <h1 className="text-5xl">You&apos;re not logged in</h1>
      )}
       */}
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
      </ul>
    </nav>
  )
}

export default Navbar
