import React from 'react'

type Props = {
  params: { query: string }
}

export default function SearchProject({ params }: Props) {
  const { query } = params

  return <div>SearchProject</div>
}
