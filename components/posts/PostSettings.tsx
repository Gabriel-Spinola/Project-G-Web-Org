'use client'

import { GiExpand } from 'react-icons/gi'
import { FullPost, FullProject } from '@/lib/types/common'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const DynamicSettingsMenu = dynamic(() => import('./PostSettingsMenu'), {
  ssr: false,
})

interface Props {
  publication: FullPost | FullProject
  isOwner: boolean
}

export default function PostSettings({ publication, isOwner }: Props) {
  return (
    <div className="flex">
      <Link
        className="flex p-2 w-[40px] h-[40px] items-center justify-center hover:bg-[#EDF2F7] rounded-md"
        href={`/posts/${publication.id}`}
      >
        <GiExpand size={20} color={'#242424'} />
      </Link>

      <DynamicSettingsMenu isOwner={isOwner} publicationId={publication.id} />
    </div>
  )
}
