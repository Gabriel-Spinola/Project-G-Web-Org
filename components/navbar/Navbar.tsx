'use client'

import React, { useState, useEffect } from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'

export default function Navbar({ userSession }: { userSession?: string }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // O array vazio como segundo argumento executa o useEffect apenas uma vez

  return (
    <section id="navbar" className="max-h-[88px]">
      {windowWidth > 1024 ? (
        <DesktopNavbar userSession={userSession} />
      ) : (
        <MobileNavbar userSession={userSession} />
      )}
    </section>
  )
}
