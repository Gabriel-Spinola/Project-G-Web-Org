import ProfilePage from '@/view/profilePage'
import { UserProfile } from '@/common.types'
import { Post } from '@/lib/database/table.types'

type Props = {
  params: {
    id: string
  }
}

const Profile = async ({ params }: Props) => {
  return <h1>{params.id}</h1>
}

export default Profile
