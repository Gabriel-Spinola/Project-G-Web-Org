import { User } from '@prisma/client'
import { getProfilePicImageUrl } from '../storage/supabase'

export function getProfilePicURL(
  user: Pick<User, 'profilePic' | 'image'>,
): string | undefined {
  const profilePicture = user?.profilePic ?? user.image

  if (profilePicture !== null && profilePicture !== undefined) {
    return getProfilePicImageUrl(profilePicture)
  }

  return undefined
}
