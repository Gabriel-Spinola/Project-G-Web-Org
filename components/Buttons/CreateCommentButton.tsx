'use client'

import React from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export default function CreateCommentButton() {
  const { pending } = useFormStatus()

  return <button type="submit">{pending ? 'Adding...' : 'add'}</button>
}
