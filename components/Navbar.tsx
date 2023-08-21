import { NavLinks } from '@/constants'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/app/api/auth/[...nextauth]/options'

async function Navbar() {
  const session = await getServerSession(AuthOptions)

  return (
    <nav>
      {session ? (
        <h1>session?.user</h1>
      ) : (
        <h1 className="text-5xl">You&apos;re not logged in</h1>
      )}

      <ul>
        {NavLinks.map((link) => (
          // eslint-disable-next-line react/jsx-key
          <li>
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          </li>
        ))}

        <li>
          <Link href="/api/auth/signin">sign In</Link>
          <Link href="/api/auth/signout">Sign Out</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
