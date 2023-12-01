'use server'

import { PinOptions } from '@/app/(feed)/_constants'
import { prisma } from '@/lib/database/prisma'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export async function unpinPublication(
  selectedType: PinOptions,
  targetId: string,
): Promise<ESResponse<never, string>> {
  try {
    const pin = await prisma.pin.deleteMany({
      where: { [selectedType]: targetId },
    })

    console.log('Removed pin from ' + JSON.stringify(pin))

    return ESSucceed({} as never)
  } catch (error: unknown) {
    console.error('pin Failed ' + error)

    return ESFailed('Pin Failed')
  }
}

export async function pinPublication(
  selectedType: PinOptions,
  authorId: string,
  targetId: string,
): Promise<ESResponse<never, string>> {
  try {
    const pin = await prisma.pin.create({
      data: {
        userId: authorId,
        [selectedType]: targetId,
      },
    })

    console.log('Pinned by: ' + JSON.stringify(pin.id))
    return ESSucceed({} as never)
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      // REVIEW - check of possible optimizations for this solution
      console.warn('Prisma client error\n', error)
    }

    console.error('Like Failed ' + error)
    return ESFailed('Failed to unpin')
  }
}
