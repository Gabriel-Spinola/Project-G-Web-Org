import React from 'react'
import styles from '@/components/posts/skeleton/skeleton.module.scss'

export default function PostSkeleton() {
  return (
    <div
      className={`${styles.skeleton} h-[768px] lg:w-[680px] x1:w-[800px] mt-8 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4 rounded-xl bg-gradient-to-r from-pure-white via-black/10 to-pure-white shadow-black`}
    />
  )
}
