'use client'

import React from 'react'
import NewCommentDialog from './NewCommentDialog'

type Props = {
  repliedCommentId: number
}

export default function ReplyDialog({ repliedCommentId }: Props) {
  return (
    <div>
      <NewCommentDialog
        target={{ id: repliedCommentId, type: 'parentCommentId' }}
      />
    </div>
  )
}
