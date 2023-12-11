/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import { validateForm } from '@/lib/schemas/newProject.schema'
import { useState } from 'react'
import { createNewProject, updateProject } from '../_actions'
import Image from 'next/image'
import { useImages, useImagesCallbacks } from '@/hooks/useImagesHooks'
import { useSession } from 'next-auth/react'
import { AiOutlineFileImage } from 'react-icons/ai'
import { IoDocumentAttachOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { MdClose } from 'react-icons/md'

interface ProjectFormState {
  title: string
  description: string | null
}

type Props = {
  projectId?: string
  content?: ProjectFormState
  projectImages?: string[]
}

export default function CreateProjectForm({
  projectId,
  content,
  projectImages,
}: Props) {
  const { data: session } = useSession()

  const isEditing = !!content

  const [form, setForm] = useState<ProjectFormState | null>(
    isEditing
      ? content
      : {
          title: '',
          description: '',
        },
  )

  const [images, setImages] = useImages(projectImages, session?.user.id)
  const { onImageChanges, onImageRemovedFromPreview } = useImagesCallbacks(
    {
      images,
      setImages,
    },
    3,
  )

  function handleStateChange(
    fieldName: keyof ProjectFormState,
    value: string,
  ): void {
    setForm((prevForm) => {
      if (prevForm) {
        return { ...prevForm, [fieldName]: value }
      }

      return null
    })
  }

  async function handleFormSubmission(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    if (images && images?.length > 0) {
      images.forEach((img: File) => {
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

      toast.warn('Algo no fomulário é invalido no campo: ' + errorMessage)

      return
    }

    // NOTE - if projectId exist create new project otherwise we're updating a project
    const { error } = !projectId
      ? await createNewProject(session?.user.id as string, validatedForm.data)
      : await updateProject(projectId, validatedForm.data)

    if (error) {
      toast.error('Houve uma falha ao criar seu projeto! 😔')

      return
    }

    setImages(undefined)
  }

  return (
    <section id="form-section">
      <form
        method="POST"
        onSubmit={handleFormSubmission}
        className="flex flex-col items-center justify-center gap-4 mt-16 p-4 rounded-xl bg-medium-gray"
      >
        <input
          type="text"
          id="title"
          name="title"
          value={form?.title}
          placeholder="Título"
          content="po"
          className="w-full p-2 rounded-md"
          onChange={(event) => handleStateChange('title', event.target.value)}
          required
        />

        <textarea
          name="description"
          id="description"
          cols={30}
          rows={10}
          value={form?.description ?? undefined}
          placeholder="Descrição"
          className="w-full p-2 rounded-md"
          onChange={(event) =>
            handleStateChange('description', event.target.value)
          }
          required
        />
        <div className="flex gap-8">
          <input type="file" accept=".pdf" className="hidden" />
          <label
            htmlFor="file"
            className="p-2 flex w-[240px] bg-darker-white text-medium-primary hover:bg-medium-primary hover:text-darker-white cursor-pointer rounded-sm"
          >
            <IoDocumentAttachOutline size={28} />
            Envie um Documento
          </label>
          <input
            type="file"
            name="display-images"
            id="images"
            accept=".png, .jpg, .jpeg, .webp"
            className="hidden"
            onChange={onImageChanges}
          />
          <label
            htmlFor="images"
            className="p-2 flex w-[240px] bg-darker-white text-medium-primary hover:bg-medium-primary hover:text-darker-white cursor-pointer rounded-sm"
          >
            <AiOutlineFileImage size={28} />
            Envie uma Imagem
          </label>
        </div>

        {/* Images Preview Section */}
        <section id="images-preview">
          {images && (
            <div className="flex gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="p-2 flex flex-col justify-end bg-darker-white rounded-md"
                >
                  {/* Remove Img Button */}
                  <button
                    onClick={() => onImageRemovedFromPreview(index)}
                    type="button"
                    className="flex justify-end"
                  >
                    <MdClose size={24} />
                  </button>

                  <Image
                    src={URL.createObjectURL(image)}
                    width={300}
                    height={400}
                    alt="Image Sent"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <input
          type="submit"
          value={isEditing ? 'Editar Projeto' : 'Criar projeto'}
          className="hover:cursor-pointer px-16 py-2 rounded-sm text-medium-primary hover:text-darker-white bg-darker-white hover:bg-medium-primary"
        />
      </form>
    </section>
  )
}
