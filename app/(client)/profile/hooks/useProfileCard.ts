import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { updateUserPageData } from '../_actions'
import { User } from '@prisma/client'
import { DefaultFormValuesType } from '../components/ProfileCard'

export function useProfileCard(
  user: Partial<User>,
  defaultEditFormValues: DefaultFormValuesType,
) {
  const router = useRouter()

  async function handleFormSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    /**
     * Helper function to get a field's value or default to an empty string
     */
    const getFieldValueOrDefault = (
      fieldName: string,
      defaultValue: string,
    ): string | null => {
      const fieldValue = formData.get(fieldName) as string | null

      return fieldValue === defaultValue ? '' : fieldValue
    }

    // Update form data for 'title' field
    formData.set(
      'title',
      getFieldValueOrDefault('title', defaultEditFormValues.title) ?? '',
    )

    const { error } = await updateUserPageData(formData, user.id as string)

    if (error) {
      console.error('failed')
    }

    router.refresh()
  }

  return handleFormSubmission
}
