import React from 'react'

interface Props {
  graduation: string
}

export default function Graduations({ graduation }: Props) {
  return (
    <div id="graduation" className="flex gap-4 h-8 z-20">
      {/* TODO - Use Image tag. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={graduation} alt={'Harvard'} className="h-8" />
    </div>
  )
}
