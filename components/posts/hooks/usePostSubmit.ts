import { createNewPost } from '@/app/(feed)/_actions'
import { validateForm } from '@/lib/schemas/comment.schema'
import { signIn } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { NewPostContext } from '../postSubmit/PostSubmitFragment'
import { Session } from 'next-auth'
import { ImageStateObj } from '@/hooks/useImagesHooks'

interface PostFormState {
  content: string
  images: File[] | null
}

export function usePostSubmit(
  { images, setImages }: ImageStateObj,
  session: Session | null,
) {
  const { onClose } = useContext(NewPostContext)

  const [form, setForm] = useState<PostFormState | null>({
    content: '',
    images: null,
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const pathName = usePathname()

  function onStateChange(fieldName: keyof PostFormState, value: string): void {
    setForm((prevForm) => {
      if (prevForm) {
        return { ...prevForm, [fieldName]: value }
      }

      return null
    })
  }

  async function onFormSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()

    if (!session) {
      signIn(undefined, { callbackUrl: '/' })

      return
    }

    if (isLoading) {
      return
    }

    const formData = new FormData(event.currentTarget)

    if (images && images?.length >= 0) {
      images?.forEach((img) => {
        formData.append('images', img)
      })
    } else {
      formData.delete('images')
    }

    const validatedForm = validateForm(formData)

    if (validatedForm.error) {
      let errorMessage = ''

      validatedForm.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ': ' + issue.message + '. \n'
      })

      alert('Algo no fomulário é invalido no campo: ' + errorMessage)

      return
    }

    setIsLoading(true)
    const { error } = await createNewPost(session.user.id, validatedForm.data)

    if (error) {
      alert('Failed to create post')

      return
    }

    setImages(undefined)
    setIsLoading(false)

    if (onClose) {
      onClose()
    }

    router.push(pathName + '?create=1', { scroll: false })
  }

  return {
    form,
    handlers: {
      onStateChange,
      onFormSubmit,
    },
    isLoading,
  }
}
