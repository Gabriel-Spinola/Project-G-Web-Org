import { User } from '@prisma/client'
import { getImageAbsoluteURLFromPubBucket } from '../storage/supabase'

export function getProfilePicURL(
  user: Pick<User, 'profilePic' | 'image'>,
): string | undefined {
  const profilePicture = user?.profilePic ?? undefined

  if (profilePicture) {
    return getImageAbsoluteURLFromPubBucket(profilePicture)
  }

  if (user.image) {
    return user.image
  }

  return undefined
}
