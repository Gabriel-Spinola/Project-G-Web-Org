import ProfilePage from '@/view/profilePage'
import { UserProfile } from '@/common.types'

type Props = {
  params: {
    id: string
  }
}

const Profile = async ({ params }: Props) => {
  // return <ProfilePage user={new UserProfile} />

  return <h1>{params.id}</h1>
}

export default Profile
