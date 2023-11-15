/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import { validateImageInput } from '@/lib/schemas/imageValidation.schema'
import { validateForm } from '@/lib/schemas/newProject.schema'
import { ChangeEvent, useState } from 'react'
import { createNewProject, updateProject } from '../../create-project/_actions'
import Image from 'next/image'
import { useImages } from './hooks/useImagesFetch'
import { useSession } from 'next-auth/react'
import { AiOutlineFileImage } from 'react-icons/ai'

interface ProjectFormState {
  title: string
  description: string | null
}

type Props = {
  projectId?: string
  content?: ProjectFormState
  files?: string[]
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

  function onImageChanges(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    if (!event.target.files || event.target.files.length <= 0) {
      return
    }

    const { error } = validateImageInput(event.target.files[0], images?.length)

    if (error) {
      alert(error)

      return
    }

    const newImage = event.target.files[0]
    setImages((prevImages) => {
      if (prevImages) return [...prevImages, newImage]

      return [newImage]
    })
  }

  function removeImageFromPreviewByIndex(index: number) {
    // REVIEW - Revoking the image for performance
    // URL.revokeObjectURL(images[index])

    setImages(
      (prevImages) => prevImages?.filter((_, prevIndex) => prevIndex !== index),
    )
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

      alert('Algo no fomulário é invalido no campo: ' + errorMessage)

      return
    }

    // NOTE - if projectId exist create new project otherwise we're updating a project
    const { error } = !projectId
      ? await createNewProject(session?.user.id as string, validatedForm.data)
      : await updateProject(projectId, validatedForm.data)

    if (error) {
      alert('Failed to create post')

      return
    }

    setImages(undefined)
  }

  return (
    <>
      <section id="form-section">
        <form method="POST" onSubmit={handleFormSubmission}>
          <input
            type="text"
            id="title"
            name="title"
            value={form?.title}
            placeholder="input"
            onChange={(event) => handleStateChange('title', event.target.value)}
            required
          />

          <textarea
            name="description"
            id="description"
            cols={30}
            rows={10}
            value={form?.description ?? undefined}
            placeholder="textare"
            onChange={(event) =>
              handleStateChange('description', event.target.value)
            }
            required
          ></textarea>

          <input type="file" accept="application/pdf" id="file" name="file" />

          <div className="img-btn hover:cursor-pointer z-50">
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

          <input type="submit" value={isEditing ? 'update' : 'create'} />
        </form>
      </section>

      {/* Images Preview Section */}
      <section id="images-preview">
        {images && (
          <>
            {images.map((image, index) => (
              <div key={index}>
                {/* Remove Img Button */}
                <button
                  onClick={() => removeImageFromPreviewByIndex(index)}
                  type="button"
                >
                  <span>X</span>
                </button>

                <Image
                  src={URL.createObjectURL(image)}
                  width={300}
                  height={400}
                  alt="Image Sent"
                />
              </div>
            ))}
          </>
        )}
      </section>
    </>
  )
}
