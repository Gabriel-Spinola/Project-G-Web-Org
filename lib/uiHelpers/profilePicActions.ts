import { User } from '@prisma/client'
import { getImageAbsoluteURLFromPubBucket } from '../storage/supabase'

export function getProfilePicURL(
  user: Pick<User, 'profilePic' | 'image'>,
): string | undefined {
  const profilePicture = user?.profilePic ?? user?.image ?? undefined

  if (profilePicture !== null && profilePicture !== undefined) {
    return getImageAbsoluteURLFromPubBucket(profilePicture)
  }

  return undefined
}
