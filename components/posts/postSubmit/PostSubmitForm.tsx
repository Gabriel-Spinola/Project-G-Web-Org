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
import React from 'react'
import SubmitPostButton from '@/components/Buttons/SubmitPostButton'
import { useSession } from 'next-auth/react'
import { useImages, useImagesCallbacks } from '@/hooks/useImagesHooks'
import { usePostSubmit } from '../hooks/usePostSubmit'
import Image from 'next/image'

export function PostSubmitForm() {
  const { data: session } = useSession()

  const [images, setImages] = useImages(undefined, session?.user.id)

  const { onImageChanges, onImageRemovedFromPreview } = useImagesCallbacks(
    { images, setImages },
    3,
  )
  const { form, handlers, isLoading } = usePostSubmit(
    { images, setImages },
    session,
  )

  const { onFormSubmit, onStateChange } = handlers

  return (
    <section>
      {/* Form Section */}
      <section
        id="post-form"
        className="notClose z-1 drop-shadow-sm text-xl p-8 rounded-[8px]"
      >
        <form method="POST" onSubmit={onFormSubmit} className="notClose">
          {/* Content */}
          <div className="notClose flex flex-row">
            <textarea
              name="content"
              placeholder="Faça uma publicação"
              className="notClose w-full pb-[192px] text-xl margin-none text-start outline-none resize-none"
              value={form?.content}
              onChange={(event) => onStateChange('content', event.target.value)}
              required
            ></textarea>
          </div>

          {/* Input Buttons */}
          <div className=" mt-3 flex flex-row justify-between items-center">
            <SendImageButton onChange={onImageChanges} />
            <SubmitPostButton isLoading={isLoading} />
          </div>
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
                  onClick={() => onImageRemovedFromPreview(index)}
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
    </section>
  )
}
