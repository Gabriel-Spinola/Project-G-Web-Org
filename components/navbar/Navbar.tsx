'use client'

import React, { useState, useEffect } from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'

export default function Navbar() {
  const [windowWidth, setWindowWidth] = useState<number | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <section id="navbar" className="max-h-[88px]">
      {windowWidth !== null && windowWidth < 1024 ? (
        <MobileNavbar />
      ) : (
        <DesktopNavbar />
      )}
    </section>
  )
}
