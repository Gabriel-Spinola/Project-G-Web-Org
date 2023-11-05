import { User } from '@prisma/client'
import { getProfilePicImageUrl } from '../storage/supabase'

export function getProfilePicURL(
  user: Pick<User, 'profilePic' | 'image'>,
): string {
  const profilePicture = user?.profilePic as string

  if (profilePicture !== null || profilePicture !== undefined) {
    return getProfilePicImageUrl(profilePicture)
  }

  return ''
}
