import React from 'react'

interface Props {
  Graduation: string
}

export default function Graduations({ Graduation }: Props) {
  return (
    <div id="graduation" className="flex flex-row-reverse gap-4 h-8 z-20">
      <img src={Graduation} alt={'Harvard'} className="h-8" />
    </div>
  )
}
