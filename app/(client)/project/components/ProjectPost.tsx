import React from 'react'
import { LikeProjectButton } from './LikeProjectButton'
import { CommentProjectButton } from './CommentProjectButton'
import { Avatar } from '@chakra-ui/avatar'

export default function ProjectPost() {
  return (
    // NOTE - PROJECT POST
    <section className="w-full flex md:w-[90%] h-[480px] md:h-[612px] rounded-l-xl bg-medium-tertiary">
      <div className="w-full h-full"></div>
      <section className="w-16 h-full flex flex-col items-center justify-evenly bg-medium-gray rounded-r-xl">
        <LikeProjectButton
          params={{
            option: 'postId',
            likes: 0,
            targetId: '',
            isLiked: false,
          }}
        />
        <Avatar />
        <CommentProjectButton />
      </section>
    </section>
  )
}
