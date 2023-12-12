'use client'

import React, { ReactNode } from 'react'
import { FeedSelectOptions } from './ProfileFeed'

type Props = {
  selectedFeed: FeedSelectOptions
  postSection: ReactNode
  projectSection: ReactNode
}

export default function FeedWrapper({
  selectedFeed,
  postSection,
  projectSection,
}: Props) {
  return <> {selectedFeed === 'posts' ? { postSection } : { projectSection }}</>
}
