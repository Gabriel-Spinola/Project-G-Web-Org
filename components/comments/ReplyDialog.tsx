'use client'

import React from 'react'
import NewCommentDialog from './NewCommentDialog'

type Props = {
  repliedCommentId: number
  fromPost: string
}

export default function ReplyDialog({ repliedCommentId, fromPost }: Props) {
  return (
    <div>
      <NewCommentDialog
        target={{ id: repliedCommentId, type: 'parentCommentId' }}
        fromPost={fromPost}
      />
    </div>
  )
}
