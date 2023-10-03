'use client'

import { useRef } from 'react'
import { UseOutsideClick } from '../useOutsideClick'
import './searchComponent.css'

export default function FilterSearchComponent() {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = UseOutsideClick(dropdownRef, false)
  const onClick = () => setIsActive(!isActive)

  return (
    <div>
      <button onClick={onClick} className="w-24 h-4 bg-light-gray">
        Perfis
      </button>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? 'active' : 'inactive'}`}
      >
        <ul>
          <li className=''>Perfis</li>
          <li className=''>Escritórios</li>
          <li className=''>Publicações</li>
        </ul>
      </nav>
    </div>
  )
}
