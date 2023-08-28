import { NavLinks } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/app/api/auth/[...nextauth]/options'
import '@/app/styles/navbar.scss'

async function Navbar() {
  const session = await getServerSession(AuthOptions)

  console.log(session)

  return (
    <nav>
      {/* {session ? (
        <h1>session?.user</h1>
      ) : (
        <h1 className="text-5xl">You&apos;re not logged in</h1>
      )}
       */}

      <ul>
        {/* //eslint-disable-next-line react/jsx-key */}
        <div className='left-wing flex flex-row'>
          {NavLinks.filter(link => link.key === 'Explore' || link.key === 'Projects').map(link => (
            <Link href={link.href} key={link.key}>
              <li key={link.key}>{link.text}</li>
            </Link>
          ))}
        </div>

        <div className='logo'>
          <li>
            {NavLinks.filter(link => link.key === 'Home').map(link => (
              <Link href={link.href} key={link.key}>
                {link.text}
                {link.key === 'Home' && (
                  <Image
                    src="/assets/logo.png"
                    alt="pinto"
                    width={220}
                    height={31}
                  />
                )}
              </Link>
            ))}
          </li>
        </div>

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
