/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

'use client'

import SendImageButton from '@/components/Buttons/SendImageButton'
import { validateImageInput } from '@/lib/schemas/imageValidation.schema'
import { validateForm } from '@/lib/schemas/newProject.schema'
import { ChangeEvent, useState } from 'react'
import { createNewProject } from '../../create-project/_actions'
import Image from 'next/image'

interface ProjectFormState {
  title: string
  description: string | null
}

type Props = {
  currentUserId: string

  // NOTE - Editing data
  content?: ProjectFormState
  files?: string[]
  projectImages?: string[]
}

export default function CreateProjectForm({
  currentUserId,
  content,
  projectImages,
}: Props) {
  const isEditing = !!content

  const [form, setForm] = useState<ProjectFormState | null>(
    isEditing
      ? content
      : {
          title: '',
          description: '',
        },
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
    // URL.revokeObjectURL(images[index]) REVIEW - Revoking the image for performance

    setImages(
      (prevImages) => prevImages?.filter((_, prevIndex) => prevIndex !== index),
    )
  }

  async function handleFormSubmission(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    if (images && images?.length >= 0) {
      images?.pop()
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

    console.log(validatedForm.data)

    const { error } = await createNewProject(currentUserId, validatedForm.data)

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

          <SendImageButton onChange={onImageChanges} />

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
