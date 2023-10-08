'use client'

import { Center, FormControl } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SigninBox() {
  return (
    <main className="min-w-full">
      <Image src={''} alt={'bg-img'} />

      <Center>
        <h2>
          <Link href="/auth/register/">NÃO POSSUI CONTA? CRIE AQUI!</Link>
        </h2>
      </Center>

      <FormControl></FormControl>
    </main>
  )
}
