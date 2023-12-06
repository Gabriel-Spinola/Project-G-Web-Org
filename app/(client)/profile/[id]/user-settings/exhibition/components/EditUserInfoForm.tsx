import UserInfoPreview from './UserInfoPreview'

export async function EditUserInfoForm() {
  return (
    <UserInfoPreview
      params={{
        description: '',
        title: '',
        location: '',
        linkedin: '',
        site: '',
        email: '',
        collegeImg:
          'https://drupalprodblob.blob.core.windows.net/stanford/branding/stanford-university-logo_1.png',
      }}
    />
  )
}
