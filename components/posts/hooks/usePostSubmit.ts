import { createNewPost } from '@/app/(feed)/_actions'
import { validateForm } from '@/lib/schemas/comment.schema'
import { signIn } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { NewPostContext } from '../postSubmit/PostSubmitFragment'
import { Session } from 'next-auth'
import { ImageStateObj } from '@/hooks/useImagesHooks'
import { toast } from 'react-toastify'

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

      toast.warn('Algo no fomulário é invalido no(s) campo(s): ' + errorMessage)

      return
    }

    setIsLoading(true)
    const { error } = await createNewPost(session.user.id, validatedForm.data)

    if (error) {
      toast.error('Houve algum erro ao enviar seu post 😔')

      return
    }

    setImages(undefined)
    setIsLoading(false)

    if (onClose) {
      onClose()
    }

    setIsLoading(false)
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
